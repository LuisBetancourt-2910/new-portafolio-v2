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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Console Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#1e293b',
            overflow: 'hidden',
          }}
        >
          {/* Console Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#000000',
              padding: '16px 24px',
              borderBottom: '2px solid #333',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginRight: '16px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
            </div>
            <div
              style={{
                display: 'flex',
                color: '#10b981',
                fontFamily: 'monospace',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              &gt; console — betanworks.dev
            </div>
          </div>

          {/* Console Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              padding: '40px',
            }}
          >
            {/* Nombre Completo */}
            <div
              style={{
                display: 'flex',
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              José Luis García Betancourt
            </div>

            {/* Portafolio Profesional | Full Stack Developer */}
            <div
              style={{
                display: 'flex',
                fontSize: '32px',
                color: '#cbd5e1',
                marginBottom: '24px',
                fontWeight: '600',
              }}
            >
              Portafolio Profesional | Full Stack Developer
            </div>

            {/* URL */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '28px',
                color: '#10b981',
                fontFamily: 'monospace',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                style={{ marginRight: '12px' }}
              >
                <path
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              betanworks.dev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
