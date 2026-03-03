import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Will Zhang — 前端工程师'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 96px',
        background: 'linear-gradient(135deg, #0d0d14 0%, #111121 60%, #0d0d1a 100%)',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 15% 20%, rgba(59,130,246,0.18) 0%, transparent 40%), radial-gradient(circle at 85% 10%, rgba(139,92,246,0.14) 0%, transparent 35%)',
        }}
      />

      {/* Top label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px rgba(16,185,129,0.6)',
          }}
        />
        <span
          style={{
            fontSize: '16px',
            letterSpacing: '0.22em',
            color: '#60a5fa',
            textTransform: 'uppercase',
          }}
        >
          FRONTEND ENGINEER
        </span>
      </div>

      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '28px' }}>
        <span
          style={{
            fontSize: '96px',
            fontWeight: 800,
            lineHeight: 1,
            color: '#f8fafc',
            letterSpacing: '-0.04em',
          }}
        >
          Will
        </span>
        <span
          style={{
            fontSize: '96px',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #93c5fd)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Zhang
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '22px',
          color: '#94a3b8',
          lineHeight: 1.6,
          maxWidth: '600px',
          margin: '0 0 40px 0',
        }}
      >
        具备全栈能力的前端工程师，擅长 GSAP 动画交互与 AI 功能开发，以技术驱动产品体验。
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {['React', 'Vue', 'GSAP', 'TypeScript', 'Node.js', 'AI'].map(tag => (
          <div
            key={tag}
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.25)',
              background: 'rgba(148,163,184,0.08)',
              color: '#cbd5e1',
              fontSize: '16px',
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '96px',
          color: '#475569',
          fontSize: '16px',
        }}
      >
        willzhang.dev
      </div>
    </div>,
    { ...size },
  )
}
