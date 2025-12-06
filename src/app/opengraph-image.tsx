import { ImageResponse } from 'next/og'

// Tamaño estándar para Open Graph
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Icono del maletín */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(255,255,255,0.1))' }}
          >
            <rect x="22" y="10" width="20" height="4" rx="2" fill="#fff" />
            <rect x="10" y="20" width="44" height="28" rx="3" fill="#fff" />
            <rect x="10" y="20" width="44" height="8" rx="3" fill="#fff" opacity="0.9" />
            <rect x="30" y="32" width="4" height="8" rx="1" fill="#000" />
            <circle cx="32" cy="36" r="2.5" fill="#000" />
          </svg>
        </div>

        {/* Título */}
        <div
          style={{
            display: 'flex',
            fontSize: 80,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          Luis Betancourt
        </div>

        {/* Descripción */}
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            color: '#888',
            marginBottom: '40px',
          }}
        >
          Portafolio Profesional
        </div>

        {/* URL */}
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#666',
            alignItems: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ marginRight: '12px' }}
          >
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          betanworks.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
