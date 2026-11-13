import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Mentorship Program',
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'role', 'status'],
    components: {
      beforeListTable: ['/components/ExportUsersButton#ExportUsersButton'],
    },
  },
  endpoints: [
    {
      path: '/export',
      method: 'get',
      handler: async (req) => {
        const { payload } = req
        const data = await payload.find({
          collection: 'users',
          limit: 1000,
          depth: 0,
        })
        const headers = ['ID', 'Full Name', 'Email', 'Role', 'Status', 'Organization', 'Created Date']
        const rows = data.docs.map((d: any) => [
          d.id,
          `"${(d.fullName || '').replace(/"/g, '""')}"`,
          `"${(d.email || '').replace(/"/g, '""')}"`,
          `"${(d.role || '').replace(/"/g, '""')}"`,
          `"${(d.status || '').replace(/"/g, '""')}"`,
          `"${(d.organization || '').replace(/"/g, '""')}"`,
          `"${d.createdAt || ''}"`,
        ].join(','))
        const csv = [headers.join(','), ...rows].join('\r\n')
        return new Response(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="AMN-SK-Member-Roster.csv"',
          },
        })
      },
    },
  ],
  auth: {
    forgotPassword: {
      generateEmailSubject: () => 'Reset your Mentor Network password',
      generateEmailHTML: (args) => {
        const siteUrl = process.env.FRONTEND_URL || 'https://amn-sk.pages.dev'
        const link = `${siteUrl}/reset-password?token=${args?.token}`
        return `<p>Hello,</p><p>Use the link below to choose a new password for your Mentor Network account:</p><p><a href="${link}">Reset my password</a></p><p>If you didn't request this, you can ignore this email.</p>`
      },
    },
  },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      defaultValue: 'Administrator',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'mentor',
      options: [
        { label: 'Admin (Staff)', value: 'admin' },
        { label: 'Mentor', value: 'mentor' },
        { label: 'Mentee', value: 'mentee' },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
      },
    },
    {
      name: 'organization',
      type: 'text',
      admin: {
        description: 'Hospital, clinic, or practice affiliation',
      },
    },
  ],
  versions: false,
}
