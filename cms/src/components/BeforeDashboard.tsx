import React from 'react'

export const BeforeDashboard: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto 2.5rem auto',
      }}
    >
      {/* Welcome Banner */}
      <div
        style={{
          padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.06) 100%)',
          border: '1px solid rgba(2, 132, 199, 0.2)',
          borderRadius: '16px',
          boxShadow: '0 4px 20px -2px rgba(2, 132, 199, 0.05)',
          marginBottom: '1.75rem',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.2rem 0.65rem',
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
                🏥 Saskatchewan Health Authority Partner · AMN-SK
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
              Mentor Network Staff Portal
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
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
              <span>View Public Website</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '0.94rem',
            color: 'var(--theme-elevation-700)',
            lineHeight: 1.5,
            maxWidth: '750px',
          }}
        >
          Welcome, Dr. Holowaty & Coordinators. Everything for managing your mentorship cohort is arranged into 4 simple tasks below.
        </p>
      </div>

      {/* 4 Primary Workstream Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>📋</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' }}>
                Intake
              </span>
            </div>
            <h2 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
              Physician Applications
            </h2>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
              Review prospective mentors and mentees who submitted via the website intake form.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="/admin/collections/membership-requests"
              style={{
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
            <a
              href="/api/export-applications"
              target="_blank"
              rel="noopener noreferrer"
              download="AMN-SK-Membership-Applications.csv"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                color: 'var(--theme-elevation-800)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>⬇ Export to Excel (.CSV)</span>
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>🩺</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(13, 148, 136, 0.1)', color: '#0d9488' }}>
                Directory
              </span>
            </div>
            <h2 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
              Clinician Roster
            </h2>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
              Active Mentors, Mentees, and staff accounts with access to the private member portal.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="/admin/collections/users"
              style={{
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
              <span>View Clinicians</span>
              <span>→</span>
            </a>
            <a
              href="/api/export-users"
              target="_blank"
              rel="noopener noreferrer"
              download="AMN-SK-Member-Roster.csv"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                color: 'var(--theme-elevation-800)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>⬇ Export Roster (.CSV)</span>
            </a>
          </div>
        </div>

        {/* Card 3: Clinical Toolkits */}
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '14px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>🔒</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                Toolkits
              </span>
            </div>
            <h2 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
              Protected Toolkits
            </h2>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
              Upload and manage role-restricted PDFs and clinical roadmaps for Mentors or Mentees.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="/admin/collections/resources"
              style={{
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                color: 'var(--theme-elevation-800)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>+ Upload New PDF</span>
            </a>
          </div>
        </div>

        {/* Card 4: Events & News */}
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '14px',
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>🗓</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(234, 88, 12, 0.1)', color: '#ea580c' }}>
                Schedule
              </span>
            </div>
            <h2 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text)' }}>
              CME Workshops & News
            </h2>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.84rem', color: 'var(--theme-elevation-600)', lineHeight: 1.45 }}>
              Publish upcoming Zoom exchange sessions, CME webinars, and public clinical news.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="/admin/collections/events"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: '#ffffff',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)',
              }}
            >
              <span>View CME Schedule</span>
              <span>→</span>
            </a>
            <a
              href="/admin/collections/events/create"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                color: 'var(--theme-elevation-800)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>+ Add New Event</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
