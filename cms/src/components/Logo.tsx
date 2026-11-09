import React from 'react'

export const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #0369a1, #0d9488)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 20,
      }}
    >
      MN
    </div>
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--theme-text)' }}>Mentor Network</div>
      <div style={{ fontSize: 12, color: 'var(--theme-elevation-500)' }}>AMN-SK Staff Portal</div>
    </div>
  </div>
)
