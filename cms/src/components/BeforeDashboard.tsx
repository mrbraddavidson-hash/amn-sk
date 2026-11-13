'use client'

import React, { useEffect, useState } from 'react'

export const BeforeDashboard: React.FC = () => {
  const [counts, setCounts] = useState({
    applications: 5,
    users: 2,
    resources: 4,
    events: 2,
    news: 1,
    team: 4,
  })

  useEffect(() => {
    // Fetch live counts from Payload API
    const fetchCounts = async () => {
      try {
        const [appRes, userRes, resRes, eventRes] = (await Promise.all([
          fetch('/api/membership-requests?limit=1').then((r) => r.json()).catch(() => null),
          fetch('/api/users?limit=1').then((r) => r.json()).catch(() => null),
          fetch('/api/resources?limit=1').then((r) => r.json()).catch(() => null),
          fetch('/api/events?limit=1').then((r) => r.json()).catch(() => null),
        ])) as any[]

        setCounts((prev) => ({
          ...prev,
          applications: typeof appRes?.totalDocs === 'number' ? appRes.totalDocs : prev.applications,
          users: typeof userRes?.totalDocs === 'number' ? userRes.totalDocs : prev.users,
          resources: typeof resRes?.totalDocs === 'number' ? resRes.totalDocs : prev.resources,
          events: typeof eventRes?.totalDocs === 'number' ? eventRes.totalDocs : prev.events,
        }))
      } catch {
        // Fall back to defaults gracefully
      }
    }

    fetchCounts()
  }, [])

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto 2.5rem auto' }}>
      {/* Institutional Top Banner */}
      <div
        style={{
          padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.06) 100%)',
          border: '1px solid rgba(2, 132, 199, 0.22)',
          borderRadius: '16px',
          boxShadow: '0 4px 20px -2px rgba(2, 132, 199, 0.05)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.85rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.22rem 0.7rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  borderRadius: '9999px',
                  background: '#0284c7',
                  color: '#ffffff',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#a7f3d0',
                  }}
                />
                Cohort 2026/2027 Active
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0d9488' }}>
                🏥 Saskatchewan Health Authority Clinical Partner · AMN-SK
              </span>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: '1.65rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--theme-text)',
              }}
            >
              Mentor Network Staff Portal & Command Center
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href="/api/export-all"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1.15rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.35)',
              }}
            >
              <span>📦 Export Complete Backup (.ZIP)</span>
            </a>
            <a
              href="https://amn-sk.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                background: 'var(--theme-elevation-0)',
                color: 'var(--theme-text)',
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <span>View Live Website</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <p
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.92rem',
            color: 'var(--theme-elevation-700)',
            lineHeight: 1.5,
            maxWidth: '820px',
          }}
        >
          Welcome, Dr. Holowaty & Coordinators. Manage clinical mentorship onboarding, review incoming physician applications, update the leadership team, and publish CME workshops and news.
        </p>

        {/* Live Metrics Ribbon */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            alignItems: 'center',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(2, 132, 199, 0.15)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(234, 179, 8, 0.12)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#b45309',
            }}
          >
            <span>📋</span>
            <span>{counts.applications} Applications Awaiting Review</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(13, 148, 136, 0.12)',
              border: '1px solid rgba(13, 148, 136, 0.3)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#0f766e',
            }}
          >
            <span>🩺</span>
            <span>{counts.users} Active Cohort Members</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#4338ca',
            }}
          >
            <span>🔒</span>
            <span>{counts.resources} Clinical Toolkits & Resources</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(2, 132, 199, 0.12)',
              border: '1px solid rgba(2, 132, 199, 0.3)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#0369a1',
            }}
          >
            <span>🍁</span>
            <span>Canadian Storage (AWS Montreal)</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: MENTORSHIP PROGRAM OPERATIONS */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--theme-text)', letterSpacing: '-0.01em' }}>
              🩺 Mentorship Program Operations
            </h2>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--theme-elevation-600)' }}>
              Core physician intake, clinician roster management, and protected orientation toolkits.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a
              href="/api/export-applications"
              target="_blank"
              rel="noopener noreferrer"
              download="AMN-SK-Membership-Applications.csv"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                background: 'var(--theme-elevation-0)',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                color: 'var(--theme-text)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>⬇ Export Applications (.CSV)</span>
            </a>
            <a
              href="/api/export-users"
              target="_blank"
              rel="noopener noreferrer"
              download="AMN-SK-Member-Roster.csv"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                background: 'var(--theme-elevation-0)',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                color: 'var(--theme-text)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>⬇ Export Roster (.CSV)</span>
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Card 1: Applications */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '14px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📋</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', background: 'rgba(234, 179, 8, 0.15)', color: '#b45309' }}>
                  {counts.applications} Submissions
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                Physician Applications
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Review incoming clinician applications. Approving an applicant automatically creates their member login and dispatches a password invitation email.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/membership-requests"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
                }}
              >
                <span>Review Applications</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 2: Clinicians */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '14px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🩺</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', background: 'rgba(13, 148, 136, 0.15)', color: '#0d9488' }}>
                  {counts.users} Active Users
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                Clinician Directory
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Manage verified Mentors, Mentees, and Coordinator logins. Assign user roles, reset credentials, or update practice locations.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/users"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(13, 148, 136, 0.3)',
                }}
              >
                <span>View Directory</span>
                <span>→</span>
              </a>
              <a
                href="/admin/collections/users/create"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '8px',
                  background: 'var(--theme-elevation-50)',
                  border: '1px solid var(--theme-elevation-150)',
                  color: 'var(--theme-elevation-800)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>+ Add</span>
              </a>
            </div>
          </div>

          {/* Card 3: Protected Toolkits */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '14px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🔒</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                  {counts.resources} Documents
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                Clinical Toolkits (Vault)
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Upload confidential PDFs and orientation roadmaps. Served exclusively to verified Mentors or Mentees through authorized Cloudflare R2 streaming.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/resources"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(99, 102, 241, 0.3)',
                }}
              >
                <span>Manage Toolkits</span>
                <span>→</span>
              </a>
              <a
                href="/admin/collections/resources/create"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '8px',
                  background: 'var(--theme-elevation-50)',
                  border: '1px solid var(--theme-elevation-150)',
                  color: 'var(--theme-elevation-800)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>+ Upload</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PUBLIC WEBSITE & CLINICAL CONTENT */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--theme-text)', letterSpacing: '-0.01em' }}>
            🌐 Public Website & Clinical Education
          </h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--theme-elevation-600)' }}>
            Publish updates, upcoming workshops, committee biographies, and open patient care roadmaps.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Card 4: Events */}
          <div
            style={{
              padding: '1.35rem',
              borderRadius: '12px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🗓</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                  CME Workshops & Zoom
                </h3>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Schedule continuing medical education workshops, peer exchanges, and embedded Zoom registration links.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/events"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: 'var(--theme-elevation-50)',
                  border: '1px solid var(--theme-elevation-200)',
                  color: 'var(--theme-text)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                View Events ({counts.events})
              </a>
              <a
                href="/admin/collections/events/create"
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: '#0284c7',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                + New
              </a>
            </div>
          </div>

          {/* Card 5: News */}
          <div
            style={{
              padding: '1.35rem',
              borderRadius: '12px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>📰</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                  News & Bulletins
                </h3>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Publish clinical bulletins, network milestones, and announcements to the public news feed.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/news"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: 'var(--theme-elevation-50)',
                  border: '1px solid var(--theme-elevation-200)',
                  color: 'var(--theme-text)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                View News ({counts.news})
              </a>
              <a
                href="/admin/collections/news/create"
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: '#0284c7',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                + Post
              </a>
            </div>
          </div>

          {/* Card 6: Team & Leadership */}
          <div
            style={{
              padding: '1.35rem',
              borderRadius: '12px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>👥</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                  Leadership & Committee
                </h3>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Update biographies, clinical credentials, and committee roles for Dr. Holowaty, Megan O'Reilly, and leadership leads.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/team-members"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: 'var(--theme-elevation-50)',
                  border: '1px solid var(--theme-elevation-200)',
                  color: 'var(--theme-text)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                View Leadership ({counts.team})
              </a>
              <a
                href="/admin/collections/team-members/create"
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: '#0284c7',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                + Add Bio
              </a>
            </div>
          </div>

          {/* Card 7: Media & Assets */}
          <div
            style={{
              padding: '1.35rem',
              borderRadius: '12px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>📁</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--theme-text)' }}>
                  Media & Documents
                </h3>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
                Cloud-stored photos, brand logos, PDF checklists, and attachments hosted on Vercel Blob / Cloudflare R2.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="/admin/collections/media"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: 'var(--theme-elevation-50)',
                  border: '1px solid var(--theme-elevation-200)',
                  color: 'var(--theme-text)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Browse Media
              </a>
              <a
                href="/admin/collections/media/create"
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  background: '#0284c7',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                + Upload
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SITE SETTINGS & HOMEPAGE FOOTER BAR */}
      <div
        style={{
          padding: '1.25rem 1.75rem',
          borderRadius: '12px',
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--theme-text)' }}>
            💬 Homepage Content & Direct Jump Links
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--theme-elevation-600)', marginTop: '0.15rem' }}>
            Quickly update homepage quotes, expandable FAQ accordions, or jump directly to live public sections.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a
            href="/admin/collections/quotes"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-200)',
              color: 'var(--theme-text)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Quotes & Testimonials
          </a>
          <a
            href="/admin/collections/faqs"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-200)',
              color: 'var(--theme-text)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            FAQ Accordions
          </a>
          <a
            href="https://amn-sk.pages.dev/apply"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-200)',
              color: 'var(--theme-text)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Live /apply Form ↗
          </a>
          <a
            href="https://amn-sk.pages.dev/portal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-200)',
              color: 'var(--theme-text)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Live Member Portal ↗
          </a>
        </div>
      </div>
    </div>
  )
}
