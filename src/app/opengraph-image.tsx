import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

// ImageResponse cannot read CSS variables, so the Pit Wall hex values are literal here.
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#0C0D10',
        }}
      >
        <div style={{ width: 120, height: 8, background: '#E0A040', borderRadius: 4 }} />
        <div style={{ marginTop: 48, fontSize: 72, fontWeight: 800, color: '#F2F2F0' }}>
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            lineHeight: 1.3,
            color: '#9A9A94',
            textWrap: 'balance',
          }}
        >
          {profile.headline}
        </div>
      </div>
    ),
    { ...size },
  );
}
