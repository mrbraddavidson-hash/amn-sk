import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Mentorship Program',
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'role', 'status'],
  },
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
