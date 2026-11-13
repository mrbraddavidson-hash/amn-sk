import React from 'react'

export const BeforeDashboard: React.FC = () => {
  return (
    <div
      style={{
        margin: '0 0 2rem 0',
        padding: '1.75rem 2rem',
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)',
        border: '1px solid rgba(2, 132, 199, 0.2)',
        borderRadius: '14px',
        boxShadow: '0 4px 20px -2px rgba(2, 132, 199, 0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.2rem 0.6rem',
                fontSize: '0.7rem',
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
            <span style={{ fontSize: '0.78rem', color: 'var(--theme-elevation-600)' }}>
              Saskatchewan Clinical Mentorship Network
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
            Staff & Coordinator Workspace
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a
            href="https://amn-sk.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: '1px solid rgba(2, 132, 199, 0.35)',
              background: 'var(--theme-elevation-0)',
              color: 'var(--theme-text)',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <span>View Public Site</span>
            <span style={{ fontSize: '0.9rem' }}>↗</span>
          </a>
          <a
            href="/admin/collections/membership-requests"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
            }}
          >
            <span>Review Applications</span>
            <span>→</span>
          </a>
        </div>
      </div>

      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.92rem',
          color: 'var(--theme-elevation-700)',
          maxWidth: '780px',
          lineHeight: 1.5,
        }}
      >
        Welcome, Dr. Holowaty & AMN-SK Coordinators. Use the shortcuts below or the sidebar to review prospective
        physician applications, update upcoming clinical CME events, or publish orientation toolkits.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
        }}
      >
        <a
          href="/admin/collections/membership-requests"
          style={{
            display: 'block',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'border-color 0.15s ease',
          }}
        >
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📋</div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--theme-text)' }}>
            Applications Queue
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-500)', marginTop: '0.15rem' }}>
            Review & approve incoming applicants
          </div>
        </a>

        <a
          href="/admin/collections/users"
          style={{
            display: 'block',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>👥</div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--theme-text)' }}>
            Member Directory
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-500)', marginTop: '0.15rem' }}>
            Manage Mentors, Mentees & Staff
          </div>
        </a>

        <a
          href="/admin/collections/resources"
          style={{
            display: 'block',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🔒</div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--theme-text)' }}>
            Protected Toolkits
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-500)', marginTop: '0.15rem' }}>
            Upload role-restricted PDFs
          </div>
        </a>

        <a
          href="/admin/collections/news"
          style={{
            display: 'block',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📰</div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--theme-text)' }}>
            News & Announcements
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-500)', marginTop: '0.15rem' }}>
            Publish updates to the public site
          </div>
        </a>
      </div>

      <div
        style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(2, 132, 199, 0.15)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>📊</span>
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--theme-text)' }}>
              1-Click Data Exports:
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--theme-elevation-600)', marginLeft: '0.4rem' }}>
              Download live rosters and applicant submissions directly into Excel / CSV.
            </span>
          </div>
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
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <span>⬇ Applications (.CSV)</span>
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
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <span>⬇ Member Roster (.CSV)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
