import React from 'react'

export const AfterNavLinks: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1.15rem',
        margin: '1.5rem 0.75rem 1.5rem 0.75rem',
        borderRadius: '12px',
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-200)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)',
          }}
        />
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--theme-text)',
          }}
        >
          Public Site Live
        </span>
      </div>

      <div style={{ fontSize: '0.88rem', color: 'var(--theme-text)', opacity: 0.85, marginBottom: '0.85rem', lineHeight: 1.45 }}>
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
          gap: '0.45rem',
          width: '100%',
          padding: '0.65rem 0.85rem',
          borderRadius: '8px',
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-300)',
          color: 'var(--theme-text)',
          fontSize: '0.88rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        <span>Open amn-sk.pages.dev</span>
        <span style={{ fontSize: '0.95rem' }}>↗</span>
      </a>
    </div>
  )
}
