import { requireAdmin } from '../../../lib/requireAdmin'

export const dynamic = 'force-dynamic'

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""'
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val)
  return `"${str.replace(/"/g, '""')}"`
}

export const GET = async (request: Request) => {
  try {
    const { payload, denied } = await requireAdmin(request)
    if (denied) return denied
    const data = await payload.find({ collection: 'events', limit: 1000, depth: 0 })
    const headers = ['ID', 'Title', 'Starts', 'Ends', 'Location Type', 'Location Details', 'Registration URL', 'Description']
    const rows = data.docs.map((d: any) => [
      d.id,
      escapeCsv(d.title),
      escapeCsv(d.eventDate),
      escapeCsv(d.endDate),
      escapeCsv(d.locationType),
      escapeCsv(d.locationDetails),
      escapeCsv(d.registrationUrl),
      escapeCsv(d.description),
    ].join(','))

    const csv = [headers.join(','), ...rows].join('\r\n')
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="AMN-SK-CME-Events.csv"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
