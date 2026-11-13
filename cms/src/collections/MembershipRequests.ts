import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const MembershipRequests: CollectionConfig = {
  slug: 'membership-requests',
  admin: {
    group: 'Mentorship Program',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'requestedRole', 'status', 'createdAt'],
    components: {
      beforeListTable: ['/components/ExportApplicationsButton#ExportApplicationsButton'],
    },
  },
  endpoints: [
    {
      path: '/export',
      method: 'get',
      handler: async (req) => {
        const { payload } = req
        const data = await payload.find({
          collection: 'membership-requests',
          limit: 1000,
          depth: 0,
        })
        const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Requested Role', 'Status', 'Organization', 'Clinical Background', 'Statement Of Interest', 'Submitted Date']
        const rows = data.docs.map((d: any) => [
          d.id,
          `"${(d.fullName || '').replace(/"/g, '""')}"`,
          `"${(d.email || '').replace(/"/g, '""')}"`,
          `"${(d.phone || '').replace(/"/g, '""')}"`,
          `"${(d.requestedRole || '').replace(/"/g, '""')}"`,
          `"${(d.status || '').replace(/"/g, '""')}"`,
          `"${(d.organization || '').replace(/"/g, '""')}"`,
          `"${(d.clinicalBackground || '').replace(/"/g, '""')}"`,
          `"${(d.statementOfInterest || '').replace(/"/g, '""')}"`,
          `"${d.createdAt || ''}"`,
        ].join(','))
        const csv = [headers.join(','), ...rows].join('\r\n')
        return new Response(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="AMN-SK-Membership-Applications.csv"',
          },
        })
      },
    },
  ],
  access: {
    // Anyone (even public visitors) can submit an application form
    create: () => true,
    // Only network administrators can review, edit, and delete requests
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        const { payload } = req
        const siteUrl = process.env.FRONTEND_URL || 'https://amn-sk.pages.dev'
        const cmsUrl =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          (process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : 'http://localhost:3001')

        // Confirmation email to the applicant on new submission
        if (operation === 'create') {
          try {
            await payload.sendEmail({
              to: doc.email,
              subject: 'We received your Mentor Network application',
              html: `<p>Hello ${doc.fullName},</p><p>Thank you for applying to the Mentor Network (AMN-SK). Our team will review your application and be in touch.</p>`,
            })
          } catch (err) {
            payload.logger.error({ err }, 'Failed to send application confirmation email')
          }
          return doc
        }

        // Approval: create the member login and email a password-setup link
        const justApproved = doc.status === 'approved' && previousDoc?.status !== 'approved'
        if (!justApproved) return doc

        try {
          const existing = await payload.find({
            collection: 'users',
            where: { email: { equals: doc.email } },
            limit: 1,
            req,
          })
          if (existing.totalDocs > 0) {
            payload.logger.info(`User already exists for ${doc.email}; skipping creation`)
            return doc
          }

          await payload.create({
            collection: 'users',
            data: {
              email: doc.email,
              password: crypto.randomUUID() + crypto.randomUUID(),
              fullName: doc.fullName,
              role: doc.requestedRole,
              organization: doc.organization || undefined,
              status: 'active',
            },
            req,
          })

          const token = await payload.forgotPassword({
            collection: 'users',
            data: { email: doc.email },
            disableEmail: true,
            req,
          })

          await payload.sendEmail({
            to: doc.email,
            subject: 'Welcome to the Mentor Network — set your password',
            html: `<p>Hello ${doc.fullName},</p><p>Your application has been approved. Set your password here:</p><p><a href="${siteUrl}/reset-password?token=${token}">Set my password</a></p><p>Then sign in at <a href="${siteUrl}/login">${siteUrl}/login</a>.</p>`,
          })
        } catch (err) {
          payload.logger.error({ err }, 'Failed to provision approved member')
        }
        return doc
      },
    ],
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
