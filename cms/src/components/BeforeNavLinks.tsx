import React from 'react'

export const BeforeNavLinks: React.FC = () => {
  return (
    <div style={{ margin: '0.6rem 0.6rem 1rem 0.6rem' }}>
      <a
        href="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          padding: '0.7rem 0.9rem',
          borderRadius: '9px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.86rem',
          textDecoration: 'none',
          boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
          transition: 'all 0.15s ease-in-out',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span>🏠</span>
          <span>Main Dashboard</span>
        </span>
        <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>←</span>
      </a>
    </div>
  )
}
