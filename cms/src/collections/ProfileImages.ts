import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * Profile photos for member accounts. Stored in the private "resource-files" bucket in Canada and
 * served only through the CMS. They are NOT public: any signed-in member can view them, and
 * nobody else can. Members can upload one for their own account; only admins can replace or delete.
 */
const isSignedIn = ({ req: { user } }: { req: { user?: unknown } }) => Boolean(user)

export const ProfileImages: CollectionConfig = {
  slug: 'profile-images',
  labels: { singular: 'Profile Image', plural: 'Profile Images' },
  admin: {
    group: 'Mentorship Program',
    description: 'Profile photos for member accounts. Visible only to signed-in members.',
  },
  access: {
    read: isSignedIn,
    create: isSignedIn,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Short description, for example "Photo of Jane Smith"' },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
}
