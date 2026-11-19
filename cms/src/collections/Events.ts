import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    group: 'Public Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'locationType'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional picture shown on the public site. JPG, PNG or WebP.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'locationType',
      type: 'select',
      required: true,
      defaultValue: 'virtual',
      options: [
        { label: 'Virtual (Zoom / Teams)', value: 'virtual' },
        { label: 'In-Person', value: 'in-person' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
    },
    {
      name: 'locationDetails',
      type: 'text',
      admin: {
        description: 'Meeting link or physical address',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'registrationUrl',
      type: 'text',
      admin: {
        description: 'Link to register or RSVP',
      },
    },
  ],
}
