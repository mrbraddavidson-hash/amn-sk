import React from 'react'

export const BeforeDashboard: React.FC = () => {
  return (
    <div
      style={{
        margin: '0 0 2rem 0',
        padding: '1.75rem 2rem',
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.07) 0%, rgba(13, 148, 136, 0.07) 100%)',
        border: '1px solid rgba(2, 132, 199, 0.22)',
        borderRadius: '14px',
        boxShadow: '0 4px 20px -2px rgba(2, 132, 199, 0.06)',
      }}
    >
      {/* Top Banner Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.7rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderRadius: '9999px',
                background: '#0284c7',
                color: '#ffffff',
                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#a7f3d0',
                  boxShadow: '0 0 0 2px rgba(167, 243, 208, 0.35)',
                }}
              />
              Cohort 2026/2027 Active
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#0d9488',
                letterSpacing: '0.02em',
              }}
            >
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
            Physician Mentorship & Administrative Console
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
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <span>Live Public Portal</span>
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
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.32)',
            }}
          >
            <span>Physician Applications</span>
            <span>→</span>
          </a>
        </div>
      </div>

      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.92rem',
          color: 'var(--theme-elevation-700)',
          maxWidth: '820px',
          lineHeight: 1.55,
        }}
      >
        Welcome, Dr. Holowaty & Steering Committee. Manage the inaugural cohort of <strong>40 Mentees, 8 Mentors, and 4 Administrative Leads</strong>. Review incoming clinician applications, publish clinical CME workshops, or update protected orientation toolkits.
      </p>

      {/* 4 Clinical Workflow Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.75rem',
        }}
      >
        <a
          href="/admin/collections/membership-requests"
          style={{
            display: 'block',
            padding: '0.95rem 1.1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.35rem' }}>📋</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7' }}>
              Intake
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--theme-text)' }}>
            Physician Intake Queue
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-600)', marginTop: '0.2rem' }}>
            Review, credential & approve applicants
          </div>
        </a>

        <a
          href="/admin/collections/users"
          style={{
            display: 'block',
            padding: '0.95rem 1.1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.35rem' }}>🩺</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(13, 148, 136, 0.12)', color: '#0d9488' }}>
              Roster
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--theme-text)' }}>
            Clinician Directory
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-600)', marginTop: '0.2rem' }}>
            Manage Mentors, Mentees & Staff
          </div>
        </a>

        <a
          href="/admin/collections/resources"
          style={{
            display: 'block',
            padding: '0.95rem 1.1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.35rem' }}>🔒</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}>
              Vault
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--theme-text)' }}>
            Clinical Toolkits & CME
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-600)', marginTop: '0.2rem' }}>
            Upload role-gated orientation PDFs
          </div>
        </a>

        <a
          href="/admin/collections/events"
          style={{
            display: 'block',
            padding: '0.95rem 1.1rem',
            borderRadius: '10px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            textDecoration: 'none',
            color: 'inherit',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.35rem' }}>🗓</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c' }}>
              Schedule
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--theme-text)' }}>
            CME Workshops & Zoom
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-600)', marginTop: '0.2rem' }}>
            Schedule webinars & peer sessions
          </div>
        </a>
      </div>

      {/* 1-Click Export Center Bar */}
      <div
        style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(2, 132, 199, 0.16)',
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
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--theme-text)' }}>
              Clinical Data Export:
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
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <span>⬇ Clinician Roster (.CSV)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
