import type { Access, CollectionConfig, Where } from 'payload'
import { isAdmin } from '../access'

const canReadResources: Access = ({ req: { user } }) => {
  if (user && user.role === 'admin') return true

  if (user && user.role === 'mentor') {
    const query: Where = {
      or: [
        { accessLevel: { equals: 'public' } },
        { accessLevel: { equals: 'mentor' } },
      ],
    }
    return query
  }

  if (user && user.role === 'mentee') {
    const query: Where = {
      or: [
        { accessLevel: { equals: 'public' } },
        { accessLevel: { equals: 'mentee' } },
      ],
    }
    return query
  }

  const query: Where = {
    accessLevel: {
      equals: 'public',
    },
  }
  return query
}

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    group: 'Mentorship Program',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'accessLevel', 'publishedDate'],
  },
  access: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    read: canReadResources,
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
