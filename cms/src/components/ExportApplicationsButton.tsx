import React from 'react'

export const ExportApplicationsButton: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.85rem 1.25rem',
        marginBottom: '1rem',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)',
        border: '1px solid rgba(2, 132, 199, 0.25)',
      }}
    >
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--theme-text)' }}>
          📊 1-Click Excel / CSV Export
        </div>
        <div style={{ fontSize: '0.76rem', color: 'var(--theme-elevation-600)', marginTop: '0.15rem' }}>
          Download all pending, approved, and prospective member submissions into an Excel-ready spreadsheet.
        </div>
      </div>
      <a
        href="/api/export-applications"
        download="AMN-SK-Membership-Applications.csv"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.5rem 1rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#ffffff',
          textDecoration: 'none',
          boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
          cursor: 'pointer',
        }}
      >
        <span>⬇ Export Applications (.CSV)</span>
      </a>
    </div>
  )
}
