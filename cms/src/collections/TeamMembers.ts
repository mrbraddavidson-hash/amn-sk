import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    group: 'Public Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'roleTitle', 'displayOrder'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roleTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Executive Director, Lead Mentor, Clinical Advisor',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
}
