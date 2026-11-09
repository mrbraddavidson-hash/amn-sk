import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    group: 'Public Content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'displayOrder'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General Information', value: 'general' },
        { label: 'For Mentors', value: 'mentors' },
        { label: 'For Mentees', value: 'mentees' },
        { label: 'Membership & Eligibility', value: 'membership' },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
