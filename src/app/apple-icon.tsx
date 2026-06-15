import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111111',
        color: '#fafafa',
        fontSize: 96,
        fontWeight: 800,
        letterSpacing: -6,
        fontFamily: 'sans-serif',
      }}
    >
      <span style={{ display: 'flex' }}>ec</span>
      <span style={{ display: 'flex', color: '#e30613' }}>.</span>
    </div>,
    { ...size },
  );
}
