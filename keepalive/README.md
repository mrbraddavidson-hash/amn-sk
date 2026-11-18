# amn-sk-keepalive

Scheduled Cloudflare Worker for the AMN-SK CMS database (Supabase, Canada). It uses the same
Hyperdrive config as the CMS (`HYPERDRIVE`).

| Schedule (UTC)   | What it does |
|------------------|--------------|
| daily 09:17      | Runs one trivial query so Supabase's free plan never pauses the project for inactivity. |
| Sundays 09:30    | Backs up every table in the `payload` schema (except `users_sessions`), encrypts it with AES-256-GCM, and stores it in the private `backups` bucket in Supabase Storage (Canada). The latest 8 backups are kept. |

Cloudflare cron day-of-week must be a name (`SUN`), not `0`. The `WEEKLY_CRON` constant in
`src/index.js` must match the string in `wrangler.jsonc` exactly.

## Secrets (set with `wrangler secret put <NAME> --name amn-sk-keepalive`)

- `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` - Supabase Storage S3 access key
- `BACKUP_KEY` - 32 random bytes, base64. **Keep a copy in a password manager.** Without it the
  backups cannot be read, and the Worker's secret cannot be read back.

Non-secret settings (`S3_ENDPOINT`, `S3_REGION`, `BACKUP_BUCKET`) are in `wrangler.jsonc`.

## Deploy

```bash
cd keepalive
npm install
npx wrangler deploy
```

## Restore

1. Download a file from the `backups` bucket (Supabase dashboard > Storage, or the S3 endpoint).
2. Decrypt it:

   ```bash
   BACKUP_KEY=<base64 key> node tools/decrypt.mjs backup-....json.enc > backup.json
   ```

3. `backup.json` is `{ format, schema, taken_at, tables: { <table>: [rows...] } }`. To restore, create
   the empty tables (start the CMS once against an empty database in non-production mode so Payload
   creates its schema), then insert each table's rows in foreign-key order and reset the `id`
   sequences (`setval`).

## Test locally

```bash
# .dev.vars (git-ignored) holds S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, BACKUP_KEY
CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE=<connection string> npx wrangler dev --test-scheduled
curl "http://127.0.0.1:8787/__scheduled?cron=30+9+*+*+SUN"
```
