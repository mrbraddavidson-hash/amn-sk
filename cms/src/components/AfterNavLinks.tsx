import React from 'react'

export const AfterNavLinks: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1rem',
        margin: '1.5rem 0.75rem 0.75rem 0.75rem',
        borderRadius: '10px',
        background: 'linear-gradient(180deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.05) 100%)',
        border: '1px solid rgba(2, 132, 199, 0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.25)',
          }}
        />
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--theme-text)',
          }}
        >
          Public Site Live
        </span>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-600)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
        Preview your published changes directly on the live network.
      </div>

      <a
        href="https://amn-sk.pages.dev"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem',
          width: '100%',
          padding: '0.45rem 0.6rem',
          borderRadius: '6px',
          background: 'var(--theme-elevation-0)',
          border: '1px solid var(--theme-elevation-200)',
          color: 'var(--theme-text)',
          fontSize: '0.75rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <span>Open amn-sk.pages.dev</span>
        <span style={{ fontSize: '0.85rem' }}>↗</span>
      </a>
    </div>
  )
}
