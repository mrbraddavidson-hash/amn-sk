import React from 'react'

export const BeforeNavLinks: React.FC = () => {
  return (
    <div style={{ margin: '0.75rem 0.6rem 1.25rem 0.6rem' }}>
      <a
        href="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.6rem',
          padding: '0.85rem 1.15rem',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #1f5c45 0%, #11392b 100%)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.98rem',
          textDecoration: 'none',
          boxShadow: '0 3px 10px rgba(31, 92, 69, 0.35)',
          transition: 'all 0.15s ease-in-out',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '1.15rem' }}>🏠</span>
          <span>Main Dashboard</span>
        </span>
        <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>←</span>
      </a>
    </div>
  )
}
