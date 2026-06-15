import { ImageResponse } from 'next/og';

export const alt = 'Eduardo Couto — Backend Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#fafafa';
const INK = '#111111';
const RED = '#e30613';

// Swiss-grid social card, generated to the correct 1200×630 dimensions.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: PAPER,
        color: INK,
        padding: '56px 64px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top meta bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `2px solid ${INK}`,
          paddingBottom: 20,
          fontSize: 22,
          letterSpacing: 4,
          color: '#555555',
        }}
      >
        <div style={{ display: 'flex' }}>BACKEND SOFTWARE ENGINEER</div>
        <div style={{ display: 'flex' }}>PORTO, PT — 41.14°N</div>
      </div>

      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 184,
            fontWeight: 800,
            letterSpacing: -10,
            lineHeight: 0.86,
          }}
        >
          eduardo
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            fontSize: 184,
            fontWeight: 800,
            letterSpacing: -10,
            lineHeight: 0.86,
          }}
        >
          <span style={{ display: 'flex' }}>couto</span>
          <span style={{ display: 'flex', color: RED }}>.</span>
        </div>
      </div>

      {/* Bottom stack line + red mark */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `2px solid ${INK}`,
          paddingTop: 20,
          fontSize: 24,
          color: '#333333',
        }}
      >
        <div style={{ display: 'flex' }}>
          Java · Kotlin · Spring Boot · Kafka · Flink · AWS · Kubernetes
        </div>
        <div style={{ display: 'flex', width: 30, height: 30, backgroundColor: RED }} />
      </div>
    </div>,
    { ...size },
  );
}
