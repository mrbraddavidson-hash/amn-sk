import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const MembershipRequests: CollectionConfig = {
  slug: 'membership-requests',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'requestedRole', 'status', 'createdAt'],
  },
  access: {
    // Anyone (even public visitors) can submit an application form
    create: () => true,
    // Only network administrators can review, edit, and delete requests
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'requestedRole',
      type: 'select',
      required: true,
      options: [
        { label: 'Prospective Mentor', value: 'mentor' },
        { label: 'Prospective Mentee', value: 'mentee' },
      ],
    },
    {
      name: 'organization',
      type: 'text',
      admin: {
        description: 'Clinic, hospital, health authority, or university affiliation',
      },
    },
    {
      name: 'clinicalBackground',
      type: 'textarea',
      admin: {
        description: 'Professional experience, clinical background, or focus area',
      },
    },
    {
      name: 'statementOfInterest',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Why do you want to join the Mentor Network?',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        description: 'Internal reviewer notes (only visible to network administrators)',
      },
    },
  ],
}
