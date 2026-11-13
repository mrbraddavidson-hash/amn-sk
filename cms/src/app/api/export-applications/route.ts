import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export const GET = async (_request: Request) => {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const data = await payload.find({
      collection: 'membership-requests',
      limit: 1000,
      depth: 0,
    })

    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Requested Role',
      'Status',
      'Organization',
      'Clinical Background',
      'Statement Of Interest',
      'Submitted Date',
    ]

    const rows = data.docs.map((d: any) =>
      [
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
      ].join(',')
    )

    const csv = [headers.join(','), ...rows].join('\r\n')

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="AMN-SK-Membership-Applications.csv"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
