import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export const GET = async (_request: Request) => {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const data = await payload.find({
      collection: 'users',
      limit: 1000,
      depth: 0,
    })

    const headers = ['ID', 'Full Name', 'Email', 'Role', 'Status', 'Organization', 'Created Date']

    const rows = data.docs.map((d: any) =>
      [
        d.id,
        `"${(d.fullName || '').replace(/"/g, '""')}"`,
        `"${(d.email || '').replace(/"/g, '""')}"`,
        `"${(d.role || '').replace(/"/g, '""')}"`,
        `"${(d.status || '').replace(/"/g, '""')}"`,
        `"${(d.organization || '').replace(/"/g, '""')}"`,
        `"${d.createdAt || ''}"`,
      ].join(',')
    )

    const csv = [headers.join(','), ...rows].join('\r\n')

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="AMN-SK-Member-Roster.csv"',
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
