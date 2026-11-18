import { Client } from 'pg'
import { AwsClient } from 'aws4fetch'

// Two jobs, both run through the CMS's Hyperdrive connection:
//  - daily  (17 9 * * *): one trivial query so Supabase's free plan never pauses the project
//  - weekly (30 9 * * SUN): encrypted backup of the CMS data into the private "backups" bucket
//    (Supabase Storage, Canada). The last KEEP_BACKUPS files are kept.
const WEEKLY_CRON = '30 9 * * SUN'
const KEEP_BACKUPS = 8
const SCHEMA = 'payload'
const SKIP_TABLES = ['users_sessions'] // short-lived login sessions; not worth keeping

export default {
  async scheduled(event, env, ctx) {
    const client = new Client({ connectionString: env.HYPERDRIVE.connectionString })
    await client.connect()
    try {
      const { rows } = await client.query('select now() as ts')
      console.log('keepalive ok', rows[0].ts)
      if (event.cron === WEEKLY_CRON) {
        await runBackup(client, env)
      }
    } finally {
      ctx.waitUntil(client.end())
    }
  },
}

async function runBackup(client, env) {
  const dump = await dumpDatabase(client)
  const counts = Object.fromEntries(Object.entries(dump.tables).map(([t, r]) => [t, r.length]))
  const encrypted = await encrypt(JSON.stringify(dump), env.BACKUP_KEY)
  const key = `backup-${dump.taken_at.replace(/[:.]/g, '-')}.json.enc`

  const aws = new AwsClient({
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    service: 's3',
    region: env.S3_REGION,
  })
  const base = `${env.S3_ENDPOINT}/${env.BACKUP_BUCKET}`

  const put = await aws.fetch(`${base}/${key}`, {
    method: 'PUT',
    body: encrypted,
    headers: { 'content-type': 'application/octet-stream' },
  })
  if (!put.ok) throw new Error(`backup upload failed: ${put.status}`)

  const head = await aws.fetch(`${base}/${key}`, { method: 'HEAD' })
  const stored = Number(head.headers.get('content-length'))
  if (!head.ok || stored !== encrypted.length) {
    throw new Error(`backup verification failed: expected ${encrypted.length} bytes, found ${stored}`)
  }
  console.log('backup ok', key, `${encrypted.length} bytes`, JSON.stringify(counts))

  await pruneOldBackups(aws, base)
}

async function dumpDatabase(client) {
  const { rows: tables } = await client.query(
    `select table_name from information_schema.tables
     where table_schema = $1 and table_type = 'BASE TABLE' order by table_name`,
    [SCHEMA],
  )
  const dump = { format: 1, schema: SCHEMA, taken_at: new Date().toISOString(), tables: {} }
  for (const { table_name } of tables) {
    if (SKIP_TABLES.includes(table_name)) continue
    const { rows } = await client.query(
      `select coalesce(json_agg(t), '[]'::json) as data from ${SCHEMA}."${table_name}" t`,
    )
    dump.tables[table_name] = rows[0].data
  }
  return dump
}

// AES-256-GCM. Output = 12-byte random IV followed by the ciphertext (which includes the auth tag).
async function encrypt(plaintext, keyBase64) {
  const raw = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0))
  if (raw.length !== 32) throw new Error('BACKUP_KEY must be 32 bytes (base64)')
  const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt'])
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext)),
  )
  const out = new Uint8Array(iv.length + ct.length)
  out.set(iv)
  out.set(ct, iv.length)
  return out
}

async function pruneOldBackups(aws, base) {
  const res = await aws.fetch(`${base}?list-type=2&prefix=backup-`)
  if (!res.ok) throw new Error(`listing backups failed: ${res.status}`)
  const xml = await res.text()
  const keys = [...xml.matchAll(/<Key>(backup-[^<]+)<\/Key>/g)].map((m) => m[1]).sort()
  const stale = keys.slice(0, Math.max(0, keys.length - KEEP_BACKUPS))
  for (const k of stale) {
    const del = await aws.fetch(`${base}/${k}`, { method: 'DELETE' })
    console.log('pruned old backup', k, del.status)
  }
}
