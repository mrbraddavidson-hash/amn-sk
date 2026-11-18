'use client'

import React, { useEffect, useState } from 'react'

// Staff dashboard. Every number is read live from the database; nothing is typed in by hand.
// Facts shown here describe the current system: data is stored in Canada (Supabase, Canada Central).

type Count = number | null // null = not loaded yet

type Application = {
  id: number
  fullName: string
  requestedRole?: string
  createdAt: string
}

const PRIMARY = '#1f5c45'
const SECONDARY = '#1f5767'
const GOLD = '#7c560e'

const card: React.CSSProperties = {
  background: 'var(--theme-elevation-50)',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: '12px',
  padding: '1.25rem 1.4rem',
}

const sectionTitle: React.CSSProperties = {
  margin: '0 0 0.25rem 0',
  fontSize: '1.05rem',
  fontWeight: 700,
  color: 'var(--theme-text)',
}

const muted: React.CSSProperties = {
  margin: 0,
  fontSize: '0.9rem',
  color: 'var(--theme-elevation-600)',
  lineHeight: 1.5,
}

const buttonBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.55rem 1rem',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: 600,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

const primaryButton: React.CSSProperties = { ...buttonBase, background: PRIMARY, color: '#ffffff' }
const secondaryButton: React.CSSProperties = {
  ...buttonBase,
  background: 'transparent',
  color: 'var(--theme-text)',
  border: '1px solid var(--theme-elevation-300)',
}

const stat = (label: string, value: Count, href: string) => (
  <a
    href={href}
    style={{ ...card, textDecoration: 'none', color: 'inherit', display: 'block', padding: '1rem 1.2rem' }}
  >
    <div style={{ fontSize: '0.85rem', color: 'var(--theme-elevation-600)', fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--theme-text)', lineHeight: 1.2, marginTop: '0.2rem' }}>
      {value === null ? '–' : value}
    </div>
  </a>
)

export const BeforeDashboard: React.FC = () => {
  const [pendingCount, setPendingCount] = useState<Count>(null)
  const [memberCount, setMemberCount] = useState<Count>(null)
  const [resourceCount, setResourceCount] = useState<Count>(null)
  const [eventCount, setEventCount] = useState<Count>(null)
  const [newsCount, setNewsCount] = useState<Count>(null)
  const [teamCount, setTeamCount] = useState<Count>(null)
  const [pending, setPending] = useState<Application[]>([])

  useEffect(() => {
    const total = (url: string) =>
      fetch(url)
        .then((r) => (r.ok ? (r.json() as Promise<any>) : null))
        .then((j) => (typeof j?.totalDocs === 'number' ? j.totalDocs : null))
        .catch(() => null)

    total('/api/membership-requests?where[status][equals]=pending&limit=1').then(setPendingCount)
    total('/api/users?limit=1').then(setMemberCount)
    total('/api/resources?limit=1').then(setResourceCount)
    total('/api/events?limit=1').then(setEventCount)
    total('/api/news?limit=1').then(setNewsCount)
    total('/api/team-members?limit=1').then(setTeamCount)

    fetch('/api/membership-requests?where[status][equals]=pending&sort=-createdAt&limit=5&depth=0')
      .then((r) => (r.ok ? (r.json() as Promise<any>) : null))
      .then((j) => setPending(Array.isArray(j?.docs) ? j.docs : []))
      .catch(() => setPending([]))
  }, [])

  const adminBase = '/admin/collections'

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto 3rem auto', padding: '0 0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
        <div>
          <p style={{ ...muted, fontWeight: 600, color: GOLD, margin: 0 }}>Mentor Network (AMN-SK) · Staff</p>
          <h1 style={{ margin: '0.2rem 0 0.25rem 0', fontSize: '1.8rem', fontWeight: 700, color: 'var(--theme-text)' }}>
            Dashboard
          </h1>
          <p style={muted}>Data stored in Canada (Supabase, Canada Central).</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="https://amn-sk.pages.dev" target="_blank" rel="noopener noreferrer" style={secondaryButton}>
            View public site ↗
          </a>
          <a href="/api/logout" style={secondaryButton}>Sign out</a>
        </div>
      </div>

      {/* Needs attention */}
      <div style={{ ...card, borderLeft: `4px solid ${GOLD}`, borderRadius: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
          <div>
            <h2 style={sectionTitle}>
              {pendingCount === null ? 'Membership requests' : `${pendingCount} waiting for review`}
            </h2>
            <p style={muted}>
              {pendingCount === 0
                ? 'No applications are waiting. Nice work.'
                : 'Approving an applicant creates their member login and emails them a link to set a password.'}
            </p>
          </div>
          <a href={`${adminBase}/membership-requests?where[status][equals]=pending`} style={primaryButton}>
            Review applications
          </a>
        </div>

        {pending.length > 0 && (
          <ul style={{ listStyle: 'none', margin: '1rem 0 0 0', padding: 0, borderTop: '1px solid var(--theme-elevation-150)' }}>
            {pending.map((a) => (
              <li key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.7rem 0', borderBottom: '1px solid var(--theme-elevation-100)', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--theme-text)' }}>{a.fullName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--theme-elevation-600)' }}>
                    {a.requestedRole === 'mentee' ? 'Mentee' : 'Mentor'} · received {new Date(a.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <a href={`${adminBase}/membership-requests/${a.id}`} style={secondaryButton}>Open</a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* At a glance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.9rem' }}>
        {stat('Members', memberCount, `${adminBase}/users`)}
        {stat('Resources', resourceCount, `${adminBase}/resources`)}
        {stat('Upcoming events', eventCount, `${adminBase}/events`)}
        {stat('News posts', newsCount, `${adminBase}/news`)}
        {stat('Leadership profiles', teamCount, `${adminBase}/team-members`)}
      </div>

      {/* Two columns: members and resources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Members</h2>
          <p style={{ ...muted, marginBottom: '1rem' }}>Mentors, mentees and staff who can sign in. Suspend an account to block sign-in straight away.</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a href={`${adminBase}/users`} style={primaryButton}>Manage members</a>
            <a href={`${adminBase}/users/create`} style={secondaryButton}>Add a member</a>
          </div>
        </div>

        <div style={card}>
          <h2 style={sectionTitle}>Resources and files</h2>
          <p style={{ ...muted, marginBottom: '1rem' }}>
            Public resources are open to everyone. Mentor-only and mentee-only files are shown only to signed-in members of that role.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a href={`${adminBase}/resources`} style={primaryButton}>Manage resources</a>
            <a href={`${adminBase}/resources/create`} style={secondaryButton}>Add a resource</a>
          </div>
        </div>
      </div>

      {/* Public website */}
      <div style={card}>
        <h2 style={sectionTitle}>Public website</h2>
        <p style={{ ...muted, marginBottom: '1rem' }}>Changes appear on the public site once saved.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'News', href: `${adminBase}/news`, add: `${adminBase}/news/create` },
            { label: 'Events and workshops', href: `${adminBase}/events`, add: `${adminBase}/events/create` },
            { label: 'Leadership and committee', href: `${adminBase}/team-members`, add: `${adminBase}/team-members/create` },
            { label: 'Quotes', href: `${adminBase}/quotes`, add: null },
            { label: 'FAQs', href: `${adminBase}/faqs`, add: null },
            { label: 'Images and media', href: `${adminBase}/media`, add: `${adminBase}/media/create` },
          ].map((item) => (
            <div key={item.label} style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: '10px', padding: '0.85rem 1rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--theme-text)', marginBottom: '0.5rem' }}>{item.label}</div>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem' }}>
                <a href={item.href} style={{ color: SECONDARY, fontWeight: 600 }}>Manage</a>
                {item.add && <a href={item.add} style={{ color: SECONDARY, fontWeight: 600 }}>Add new</a>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exports */}
      <div style={card}>
        <h2 style={sectionTitle}>Exports</h2>
        <p style={{ ...muted, marginBottom: '1rem' }}>
          Downloads for your records or for reporting. Each one needs you to be signed in.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
          <a href="/api/export-applications" style={{ ...secondaryButton, justifyContent: 'center' }}>Applications (CSV)</a>
          <a href="/api/export-users" style={{ ...secondaryButton, justifyContent: 'center' }}>Members (CSV)</a>
          <a href="/api/export-all" target="_blank" rel="noopener noreferrer" style={{ ...primaryButton, justifyContent: 'center', background: GOLD }}>
            Full backup (ZIP)
          </a>
        </div>
      </div>
    </div>
  )
}
