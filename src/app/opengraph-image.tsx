import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sandro Carvalho — Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const avatarUrl = new URL('/avatar_contact.png', 'https://sandrocarvalho.com.br').toString()

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FF6F00 0%, #FF8C00 25%, #FFA500 50%, #FFC000 75%, #FFD700 100%)',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Círculo decorativo de fundo */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '320px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.08)',
          }}
        />

        {/* Texto */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '660px',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 300, color: 'rgba(0,0,0,0.6)' }}>
              sandrocarvalho.com.br
            </span>
            <span style={{ fontSize: '28px', fontWeight: 600, color: '#1a0a00' }}>
              Full Stack Developer
            </span>
          </div>

          <p
            style={{
              fontSize: '44px',
              fontWeight: 700,
              color: '#1a0a00',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Apaixonado por transformar ideias em projetos e interfaces eficientes.
          </p>
        </div>

        {/* Avatar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt="Sandro"
          width={357}
          height={357}
          style={{
            position: 'absolute',
            right: '60px',
            bottom: '0',
            height: '560px',
            width: 'auto',
            objectFit: 'contain',
            zIndex: 1,
            filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.3))',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
