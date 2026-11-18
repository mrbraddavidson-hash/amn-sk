import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'
import {
  adminNewApplicationEmail,
  applicationReceivedEmail,
  welcomeSetPasswordEmail,
} from '../lib/emailTemplates'

// Public form: cap how many applications can trigger emails in one hour.
const MAX_EMAILED_PER_HOUR = 20

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
  access: {
    // Anyone (even public visitors) can submit an application form
    create: () => true,
    // Only network administrators can review, edit, and delete requests
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    // The form is public, so a visitor must not be able to pre-set review fields.
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation === 'create' && !req.user && data) {
          data.status = 'pending'
          delete data.adminNotes
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        const { payload } = req
        const siteUrl = process.env.FRONTEND_URL || 'https://amn-sk.pages.dev'
        const cmsUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

        if (operation === 'create') {
          // Abuse guard: this form is public and each submission emails the address typed into it.
          // Send at most one set of emails per address per 24 hours, and cap the total per hour.
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
          const [sameAddress, lastHour] = await Promise.all([
            payload.count({
              collection: 'membership-requests',
              where: {
                and: [
                  { email: { equals: doc.email } },
                  { createdAt: { greater_than: dayAgo } },
                  { id: { not_equals: doc.id } },
                ],
              },
              overrideAccess: true,
              req,
            }),
            payload.count({
              collection: 'membership-requests',
              where: { createdAt: { greater_than: hourAgo } },
              overrideAccess: true,
              req,
            }),
          ])
          if (sameAddress.totalDocs > 0 || lastHour.totalDocs > MAX_EMAILED_PER_HOUR) {
            payload.logger.warn(
              `Skipped emails for application ${doc.id}: repeat address or hourly limit reached`,
            )
            return doc
          }

          // Confirmation to the applicant
          try {
            const mail = applicationReceivedEmail({ fullName: doc.fullName, requestedRole: doc.requestedRole })
            await payload.sendEmail({ to: doc.email, subject: mail.subject, html: mail.html })
          } catch (err) {
            payload.logger.error({ err }, 'Failed to send application confirmation email')
          }

          // Heads-up to the Network's reviewers (addresses are kept in the ADMIN_NOTIFY_EMAIL secret)
          const reviewers = (process.env.ADMIN_NOTIFY_EMAIL || '')
            .split(',')
            .map((e) => e.trim())
            .filter(Boolean)
          if (reviewers.length) {
            try {
              const mail = adminNewApplicationEmail({
                fullName: doc.fullName,
                email: doc.email,
                requestedRole: doc.requestedRole,
                organization: doc.organization,
                adminUrl: `${cmsUrl}/admin/collections/membership-requests/${doc.id}`,
              })
              await payload.sendEmail({ to: reviewers, subject: mail.subject, html: mail.html })
            } catch (err) {
              payload.logger.error({ err }, 'Failed to send new-application notice to reviewers')
            }
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

          // 7 days: a new member may not open the email straight away (the default is 1 hour).
          const token = await payload.forgotPassword({
            collection: 'users',
            data: { email: doc.email },
            disableEmail: true,
            expiration: 7 * 24 * 60 * 60 * 1000,
            req,
          })

          const mail = welcomeSetPasswordEmail({
            fullName: doc.fullName,
            setPasswordUrl: `${siteUrl}/reset-password?token=${token}`,
            loginUrl: `${siteUrl}/login`,
          })
          await payload.sendEmail({ to: doc.email, subject: mail.subject, html: mail.html })
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
