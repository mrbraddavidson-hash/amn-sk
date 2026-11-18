import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Resources } from './collections/Resources'
import { MembershipRequests } from './collections/MembershipRequests'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { TeamMembers } from './collections/TeamMembers'
import { Quotes } from './collections/Quotes'
import { FAQs } from './collections/FAQs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// On Cloudflare Workers, bindings (Hyperdrive, R2) come from the request context.
// Under the Payload CLI or `next build` there is no Workers context, so fall back
// to DATABASE_URI and disable R2 uploads.
async function getBindings() {
  try {
    const { env } = await getCloudflareContext({ async: true })
    return env
  } catch {
    return undefined
  }
}

const bindings = await getBindings()

const databaseUrl = bindings?.HYPERDRIVE?.connectionString || process.env.DATABASE_URI || ''

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    'https://amn-sk-cms.mrbraddavidson.workers.dev',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Mentor Network (AMN-SK)',
      description: 'Staff portal for the Mentor Network (AMN-SK)',
    },
    components: {
      graphics: {
        Logo: '/components/Logo#Logo',
        Icon: '/components/Icon#Icon',
      },
      beforeDashboard: ['/components/BeforeDashboard#BeforeDashboard'],
      beforeNavLinks: ['/components/BeforeNavLinks#BeforeNavLinks'],
      afterNavLinks: ['/components/AfterNavLinks#AfterNavLinks'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  auth: {
    passwordHashIterations: 100000,
  },
  cors: [
    'http://localhost:4321',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://amn-sk.pages.dev',
    'https://amn-sk-cms.mrbraddavidson.workers.dev',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '',
    process.env.FRONTEND_URL || '',
  ].filter(Boolean),
  csrf: [
    'http://localhost:4321',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://amn-sk.pages.dev',
    'https://amn-sk-cms.mrbraddavidson.workers.dev',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '',
    process.env.FRONTEND_URL || '',
  ].filter(Boolean),
  collections: [
    Users,
    Resources,
    MembershipRequests,
    News,
    Events,
    TeamMembers,
    Quotes,
    FAQs,
    Media,
  ],
  editor: lexicalEditor(),
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          defaultFromAddress: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          defaultFromName: 'Mentor Network (AMN-SK)',
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),
  secret: process.env.PAYLOAD_SECRET || 'amn_sk_fallback_secret_key_12345',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    // Uploads live in a private Supabase Storage bucket in Canada (ca-central-1),
    // reached through Supabase's S3-compatible endpoint.
    s3Storage({
      enabled: Boolean(process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY),
      bucket: process.env.S3_BUCKET || 'media',
      collections: {
        media: true,
      },
      config: {
        endpoint:
          process.env.S3_ENDPOINT || 'https://gnoubqtrwlnsfeolpari.storage.supabase.co/storage/v1/s3',
        region: process.env.S3_REGION || 'ca-central-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      // Workers can't reuse a connection opened in a different request, so each
      // client is used once and discarded; Hyperdrive does the real pooling.
      ...(bindings?.HYPERDRIVE ? { maxUses: 1, idleTimeoutMillis: 0 } : {}),
    },
    schemaName: 'payload',
  }),
})
