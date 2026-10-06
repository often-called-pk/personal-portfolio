import { ImageResponse } from 'next/og';

// Literal hex: ImageResponse cannot read CSS variables.
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C0D10',
          borderRadius: 4,
          color: '#E0A040',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        PK
      </div>
    ),
    { ...size },
  );
}
