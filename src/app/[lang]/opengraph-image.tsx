import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'
import { archivo } from "@/fonts/index"

export const alt = 'Sandro Carvalho — Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const avatarData = await readFile(path.join(process.cwd(), 'public/avatar_contact.png'))
  const avatarSrc = `data:image/png;base64,${avatarData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FF6F00 0%, #FF8C00 25%, #FFA500 50%, #FFC000 75%, #FFD700 100%)',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: archivo.style.fontFamily,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '320px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
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
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '660px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 400, color: 'rgba(0,0,0,0.6)',  fontFamily: archivo.style.fontFamily, }}>
              sandrocarvalho.com.br
            </span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#1a0a00', fontFamily: archivo.style.fontFamily, }}>
              Full Stack Developer
            </span>
          </div>

          <div
            style={{
              fontSize: '44px',
              maxWidth: '500px',
              fontWeight: 800,
              color: '#1a0a00',
              lineHeight: 1.2,
              fontFamily: archivo.style.fontFamily,
            }}
          >
            Apaixonado por transformar ideias em projetos e interfaces eficientes.
          </div>
        </div>

        <img
          src={avatarSrc}
          alt="Sandro"
          width={560}
          height={560}
          style={{
            position: 'absolute',
            right: '60px',
            bottom: '-10px',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
