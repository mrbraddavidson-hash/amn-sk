import React from 'react'

export const Icon: React.FC = () => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
      boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg
      width="18"
      height="18"
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
)
