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
            position: 'relative',
          }}
        >
          {/* Código decorativo en el fondo */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              display: 'flex',
              flexDirection: 'column',
              padding: '60px 40px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#334155',
              opacity: 0.4,
              lineHeight: '1.8',
            }}
          >
            <div style={{ display: 'flex' }}>const developer = &#123;</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>name: "José Luis García Betancourt",</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>role: "Full Stack Developer",</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>experience: "2+ años",</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>technologies: ["React", "Node.js", "TypeScript"],</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>projects: 7,</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>passion: "Creating scalable solutions"</div>
            <div style={{ display: 'flex' }}>&#125;;</div>
            <div style={{ display: 'flex', marginTop: '20px' }}></div>
            <div style={{ display: 'flex' }}>function buildAmazingThings() &#123;</div>
            <div style={{ display: 'flex', paddingLeft: '20px' }}>return dedication + creativity;</div>
            <div style={{ display: 'flex' }}>&#125;</div>
          </div>

          {/* Console Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0f172a',
              padding: '20px 32px',
              borderBottom: '2px solid #334155',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            </div>
            <div
              style={{
                display: 'flex',
                color: '#10b981',
                fontFamily: 'monospace',
                fontSize: '20px',
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
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Icono LB */}
            <div
              style={{
                display: 'flex',
                width: '140px',
                height: '140px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
                border: '4px solid #10b981',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: '#000000',
                  fontFamily: 'monospace',
                }}
              >
                LB
              </div>
            </div>

            {/* Nombre Completo */}
            <div
              style={{
                display: 'flex',
                fontSize: '56px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
                textAlign: 'center',
              }}
            >
              José Luis García Betancourt
            </div>

            {/* Portafolio Profesional | Full Stack Developer */}
            <div
              style={{
                display: 'flex',
                fontSize: '28px',
                color: '#cbd5e1',
                marginBottom: '32px',
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
                fontSize: '24px',
                color: '#10b981',
                fontFamily: 'monospace',
                backgroundColor: '#0f172a',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '2px solid #334155',
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

          {/* Footer con estadísticas */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '24px 40px',
              backgroundColor: '#0f172a',
              borderTop: '2px solid #334155',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>7+</div>
              <div style={{ display: 'flex', fontSize: '14px', color: '#94a3b8' }}>Proyectos</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}>2+</div>
              <div style={{ display: 'flex', fontSize: '14px', color: '#94a3b8' }}>Años</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>24+</div>
              <div style={{ display: 'flex', fontSize: '14px', color: '#94a3b8' }}>Tecnologías</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>10+</div>
              <div style={{ display: 'flex', fontSize: '14px', color: '#94a3b8' }}>Soluciones</div>
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
