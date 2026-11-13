import React from 'react'

export const Icon: React.FC = () => (
  <svg
    className="graphic-icon"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'block',
      width: '100%',
      height: '100%',
      overflow: 'visible',
    }}
  >
    <defs>
      <linearGradient id="amn-sk-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#amn-sk-icon-grad)" />
    <path
      d="M15.5 17.5v-1.25a2.5 2.5 0 0 0-2.5-2.5h-3a2.5 2.5 0 0 0-2.5 2.5v1.25"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="11.5" cy="9" r="2.25" stroke="#ffffff" strokeWidth="1.6" />
    <path
      d="M18.5 17.5v-1.25a2.5 2.5 0 0 0-1.85-2.4"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15.5 6.85a2.25 2.25 0 0 1 0 4.3"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)
