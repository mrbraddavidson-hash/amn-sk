import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

// Public website images. Anyone can view them; only admins can add, replace or delete.
// (Without the explicit rules below, Payload lets ANY logged-in user write.)
// Files for restricted resources do NOT go here; they use the "resource-files" collection.
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Assets & Uploads',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
