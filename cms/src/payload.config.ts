import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    'https://amn-sk-cms.mrbraddavidson.workers.dev',
  admin: {
    user: Users.slug,
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
  secret: process.env.PAYLOAD_SECRET || 'amn_sk_fallback_secret_key_12345',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    schemaName: 'payload',
  }),
})
