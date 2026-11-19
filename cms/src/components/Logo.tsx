import React from 'react'

export const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        background: 'linear-gradient(135deg, #1f5c45 0%, #11392b 100%)',
        boxShadow: '0 4px 12px rgba(31, 92, 69, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
    <div style={{ lineHeight: 1.25 }}>
      <div
        style={{
          fontWeight: 800,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
          color: 'var(--theme-text)',
        }}
      >
        Mentor Network
      </div>
      <div
        style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#a06f12',
        }}
      >
        AMN-SK · Saskatchewan
      </div>
    </div>
  </div>
)
