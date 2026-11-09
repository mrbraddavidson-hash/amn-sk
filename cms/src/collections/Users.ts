import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'role', 'status'],
  },
  auth: true,
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
