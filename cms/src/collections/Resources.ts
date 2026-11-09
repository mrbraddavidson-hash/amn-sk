import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'accessLevel', 'publishedDate'],
  },
  access: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    read: ({ req: { user } }) => {
      // If admin, see all
      if (user && user.role === 'admin') return true

      // If mentor, see public and mentor resources
      if (user && user.role === 'mentor') {
        return {
          or: [
            { accessLevel: { equals: 'public' } },
            { accessLevel: { equals: 'mentor' } },
          ],
        }
      }

      // If mentee, see public and mentee resources
      if (user && user.role === 'mentee') {
        return {
          or: [
            { accessLevel: { equals: 'public' } },
            { accessLevel: { equals: 'mentee' } },
          ],
        }
      }

      // Anonymous / Public visitors can only read public resources
      return {
        accessLevel: {
          equals: 'public',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Health Provider Resource', value: 'health-provider' },
        { label: 'Patient Resource', value: 'patient' },
        { label: 'Mentor Resource (Restricted)', value: 'mentor' },
        { label: 'Mentee Resource (Restricted)', value: 'mentee' },
      ],
    },
    {
      name: 'accessLevel',
      type: 'select',
      required: true,
      defaultValue: 'public',
      options: [
        { label: 'Public (Anyone)', value: 'public' },
        { label: 'Mentor Only (Login Required)', value: 'mentor' },
        { label: 'Mentee Only (Login Required)', value: 'mentee' },
      ],
      admin: {
        description: 'Determines whether this resource requires member login and role authorization to view and download.',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
