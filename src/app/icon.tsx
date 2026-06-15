import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
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
        fontSize: 34,
        fontWeight: 800,
        letterSpacing: -2,
        fontFamily: 'sans-serif',
      }}
    >
      <span style={{ display: 'flex' }}>ec</span>
      <span style={{ display: 'flex', color: '#e30613' }}>.</span>
    </div>,
    { ...size },
  );
}
