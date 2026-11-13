import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""'
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val)
  return `"${str.replace(/"/g, '""')}"`
}

export const GET = async (_request: Request) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.find({ collection: 'resources', limit: 1000, depth: 0 })
    const headers = ['ID', 'Title', 'Category', 'Access Level', 'Description', 'Published Date']
    const rows = data.docs.map((d: any) => [
      d.id,
      escapeCsv(d.title),
      escapeCsv(d.category),
      escapeCsv(d.accessLevel),
      escapeCsv(d.description),
      escapeCsv(d.publishedDate || d.createdAt),
    ].join(','))

    const csv = [headers.join(','), ...rows].join('\r\n')
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="AMN-SK-Clinical-Toolkits.csv"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
