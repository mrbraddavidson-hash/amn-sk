// Usage:  BACKUP_KEY=<base64 key> node tools/decrypt.mjs backup-....json.enc > backup.json
import { readFileSync } from 'node:fs'
import { webcrypto as crypto } from 'node:crypto'

const [file] = process.argv.slice(2)
if (!file || !process.env.BACKUP_KEY) {
  console.error('Usage: BACKUP_KEY=<base64 key> node tools/decrypt.mjs <backup file> > backup.json')
  process.exit(1)
}
const data = readFileSync(file)
const key = await crypto.subtle.importKey('raw', Buffer.from(process.env.BACKUP_KEY, 'base64'), 'AES-GCM', false, ['decrypt'])
const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: data.subarray(0, 12) }, key, data.subarray(12))
process.stdout.write(Buffer.from(plain))
