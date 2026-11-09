import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'roleOrAffiliation', 'isActive'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'roleOrAffiliation',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Mentor, Rural Family Physician or Mentee, Year 1 Resident',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
