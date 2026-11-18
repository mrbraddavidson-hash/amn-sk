import { requireAdmin } from '../../../lib/requireAdmin'
import JSZip from 'jszip'

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

    const zip = new JSZip()
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]

    // 1. Fetch all collections in parallel
    const [apps, users, resources, events, news, team, faqs, quotes] = await Promise.all([
      payload.find({ collection: 'membership-requests', limit: 5000, depth: 0 }),
      payload.find({ collection: 'users', limit: 5000, depth: 0 }),
      payload.find({ collection: 'resources', limit: 5000, depth: 0 }),
      payload.find({ collection: 'events', limit: 5000, depth: 0 }),
      payload.find({ collection: 'news', limit: 5000, depth: 0 }),
      payload.find({ collection: 'team-members', limit: 5000, depth: 0 }),
      payload.find({ collection: 'faqs', limit: 5000, depth: 0 }),
      payload.find({ collection: 'quotes', limit: 5000, depth: 0 }),
    ])

    // --- CSV 1: Applications ---
    const appHeaders = ['ID', 'Full Name', 'Email', 'Phone', 'Requested Role', 'Status', 'Organization', 'Clinical Background', 'Statement Of Interest', 'Submitted Date']
    const appRows = apps.docs.map((d: any) => [
      d.id,
      escapeCsv(d.fullName),
      escapeCsv(d.email),
      escapeCsv(d.phone),
      escapeCsv(d.requestedRole),
      escapeCsv(d.status),
      escapeCsv(d.organization),
      escapeCsv(d.clinicalBackground),
      escapeCsv(d.statementOfInterest),
      escapeCsv(d.createdAt),
    ].join(','))
    zip.file('01_physician_applications.csv', [appHeaders.join(','), ...appRows].join('\r\n'))

    // --- CSV 2: Clinician Roster ---
    const userHeaders = ['ID', 'Full Name', 'Email', 'Role', 'Status', 'Organization', 'Created Date']
    const userRows = users.docs.map((d: any) => [
      d.id,
      escapeCsv(d.fullName),
      escapeCsv(d.email),
      escapeCsv(d.role),
      escapeCsv(d.status),
      escapeCsv(d.organization),
      escapeCsv(d.createdAt),
    ].join(','))
    zip.file('02_clinician_roster.csv', [userHeaders.join(','), ...userRows].join('\r\n'))

    // --- CSV 3: Clinical Toolkits ---
    const resHeaders = ['ID', 'Title', 'Category', 'Access Level', 'Description', 'Published Date']
    const resRows = resources.docs.map((d: any) => [
      d.id,
      escapeCsv(d.title),
      escapeCsv(d.category),
      escapeCsv(d.accessLevel),
      escapeCsv(d.description),
      escapeCsv(d.publishedDate || d.createdAt),
    ].join(','))
    zip.file('03_clinical_toolkits.csv', [resHeaders.join(','), ...resRows].join('\r\n'))

    // --- CSV 4: CME Events & Workshops ---
    const eventHeaders = ['ID', 'Title', 'Starts', 'Ends', 'Location Type', 'Location Details', 'Registration URL', 'Description']
    const eventRows = events.docs.map((d: any) => [
      d.id,
      escapeCsv(d.title),
      escapeCsv(d.eventDate),
      escapeCsv(d.endDate),
      escapeCsv(d.locationType),
      escapeCsv(d.locationDetails),
      escapeCsv(d.registrationUrl),
      escapeCsv(d.description),
    ].join(','))
    zip.file('04_cme_workshops_and_events.csv', [eventHeaders.join(','), ...eventRows].join('\r\n'))

    // --- CSV 5: News Bulletins ---
    const newsHeaders = ['ID', 'Title', 'Published Date', 'Excerpt', 'Is Featured']
    const newsRows = news.docs.map((d: any) => [
      d.id,
      escapeCsv(d.title),
      escapeCsv(d.publishedDate),
      escapeCsv(d.excerpt),
      escapeCsv(d.isFeatured ? 'Yes' : 'No'),
    ].join(','))
    zip.file('05_news_bulletins.csv', [newsHeaders.join(','), ...newsRows].join('\r\n'))

    // --- CSV 6: Leadership Team ---
    const teamHeaders = ['ID', 'Name', 'Role / Title', 'Bio', 'Display Order']
    const teamRows = team.docs.map((d: any) => [
      d.id,
      escapeCsv(d.name),
      escapeCsv(d.roleTitle),
      escapeCsv(d.bio),
      escapeCsv(d.displayOrder),
    ].join(','))
    zip.file('06_leadership_and_committee.csv', [teamHeaders.join(','), ...teamRows].join('\r\n'))

    // --- JSON Master Backup ---
    const masterJson = {
      exportedAt: now.toISOString(),
      network: 'Mentor Network (AMN-SK)',
      preparedFor: 'Dr. Melissa Holowaty, PhD, MD & Steering Committee',
      dataSovereignty: 'Supabase PostgreSQL and Supabase Storage · Canada (Central), ca-central-1',
      collections: {
        membershipRequests: apps.docs,
        users: users.docs,
        resources: resources.docs,
        events: events.docs,
        news: news.docs,
        teamMembers: team.docs,
        faqs: faqs.docs,
        quotes: quotes.docs,
      },
    }
    zip.file('master_database_dump.json', JSON.stringify(masterJson, null, 2))

    // --- README File ---
    const readme = `======================================================================
MENTOR NETWORK (AMN-SK) — COMPLETE DATA BACKUP ARCHIVE
======================================================================
Export Date: ${now.toUTCString()}
Client: Dr. Melissa Holowaty, PhD, MD & Steering Committee
Prepared by: Brad Davidson, Davidson Digital Design

WHERE THE DATA IS STORED:
- Database: Supabase PostgreSQL, Canada (Central), ca-central-1
- Uploaded files: Supabase Storage, Canada (Central), ca-central-1
- Note: the website and CMS run on Cloudflare, so requests pass through the nearest Cloudflare data centre.

ARCHIVE CONTENTS:
- 01_physician_applications.csv      All prospective Mentor & Mentee submissions
- 02_clinician_roster.csv             Active Mentors, Mentees, and Staff accounts
- 03_clinical_toolkits.csv            Metadata for orientation PDFs & roadmaps
- 04_cme_workshops_and_events.csv     Schedule, Zoom URLs, and event metadata
- 05_news_bulletins.csv               Clinical news posts and announcements
- 06_leadership_and_committee.csv     Leadership bios and committee profiles
- master_database_dump.json           Raw JSON of every record (password hashes are not included, so members would need to reset passwords)

DATA OWNERSHIP & FREEDOM:
AMN-SK owns all code, data, and database records outright with zero vendor lock-in.
======================================================================`
    zip.file('README_BACKUP.txt', readme)

    // Generate zip buffer
    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    })

    return new Response(zipBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="AMN-SK-Complete-Network-Backup-${dateStr}.zip"`,
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
