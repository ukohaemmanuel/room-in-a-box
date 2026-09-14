import type { JSX, ReactNode } from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import type { StickerKind } from '../types';

const ink = '#5A3A32';

type ArtProps = { size?: number };

function Board({ children, size = 64 }: { children: ReactNode } & ArtProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {children}
    </Svg>
  );
}

function Cat({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Ellipse cx="34" cy="42" rx="16" ry="6" fill="#E7B48A" opacity={0.45} />
      <Path
        d="M18 30c0-10 6-18 16-18 9 0 16 7 16 16 0 11-7 20-16 20-10 0-16-8-16-18z"
        fill="#F2A56C"
        stroke={ink}
        strokeWidth="2.2"
      />
      <Path d="M20 20 L16 8 L26 16 Z" fill="#F2A56C" stroke={ink} strokeWidth="2" />
      <Path d="M42 18 L50 8 L46 22 Z" fill="#F2A56C" stroke={ink} strokeWidth="2" />
      <Path d="M24 16 L22 10 L28 15" fill="#F8C9A8" />
      <Path d="M44 16 L48 10 L46 18" fill="#F8C9A8" />
      <Ellipse cx="32" cy="32" rx="11" ry="10" fill="#FFE4CC" />
      <Path d="M27 30c1.4-1.4 3-1.4 4 0" stroke={ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Path d="M35 30c1.4-1.4 3-1.4 4 0" stroke={ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Path d="M32 34 l-2 2 h4 z" fill="#E8897A" />
      <Path d="M48 34c8 2 10 12 2 16" stroke="#E08A55" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Circle cx="18" cy="36" r="2.2" fill="#E8897A" opacity={0.8} />
    </Board>
  );
}

function Lamp({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Ellipse cx="32" cy="54" rx="12" ry="3.5" fill="#D7B08A" />
      <Rect x="29" y="30" width="6" height="22" rx="2" fill="#E8C39A" stroke={ink} strokeWidth="1.6" />
      <Path
        d="M16 30c2-14 10-20 16-20s14 6 16 20c-6 4-26 4-32 0z"
        fill="#F7E2A0"
        stroke={ink}
        strokeWidth="2"
      />
      <Ellipse cx="32" cy="30" rx="16" ry="4" fill="#FFE9B8" stroke={ink} strokeWidth="1.6" />
      <Circle cx="32" cy="18" r="2" fill="#FFF6D8" />
    </Board>
  );
}

function Mug({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Path d="M28 10c0 6-4 8-4 12" stroke="#C9D8E8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <Path d="M34 8c1 6-2 9-1 14" stroke="#DCE6F0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path
        d="M16 24h26c1 0 3 2 3 6v14c0 8-8 12-16 12s-16-4-16-12V30c0-4 2-6 3-6z"
        fill="#F4B7B0"
        stroke={ink}
        strokeWidth="2"
      />
      <Path d="M42 30c10 1 12 14 0 16" stroke={ink} strokeWidth="2.4" fill="none" />
      <Path d="M42 32c7 1 8 10 0 12" stroke="#FFF0EA" strokeWidth="2.4" fill="none" />
      <Ellipse cx="29" cy="24" rx="13" ry="4.5" fill="#FFF6F0" stroke={ink} strokeWidth="1.8" />
      <Ellipse cx="29" cy="24" rx="9" ry="2.8" fill="#C98958" />
      <Path d="M22 36c6-4 12 2 8 6" stroke="#FFF0EA" strokeWidth="2" fill="none" strokeLinecap="round" />
    </Board>
  );
}

function Sprout({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Ellipse cx="32" cy="56" rx="10" ry="3" fill="#D7B08A" opacity={0.5} />
      <Path d="M22 40h20l-3 16H25z" fill="#E8897A" stroke={ink} strokeWidth="2" />
      <Path d="M24 40h16l-1.2 4H25.4z" fill="#F3A898" />
      <Path d="M32 40c0-10 0-16 0-22" stroke="#6FA87A" strokeWidth="3" fill="none" />
      <Ellipse cx="22" cy="22" rx="10" ry="7" fill="#8FCB9B" stroke={ink} strokeWidth="1.8" />
      <Ellipse cx="42" cy="18" rx="11" ry="7.5" fill="#7BBF8A" stroke={ink} strokeWidth="1.8" />
      <Ellipse cx="33" cy="12" rx="7" ry="5" fill="#A6DBB0" stroke={ink} strokeWidth="1.6" />
    </Board>
  );
}

function Poster({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Rect x="12" y="8" width="40" height="48" rx="6" fill="#FFF8EE" stroke={ink} strokeWidth="2" />
      <Rect x="16" y="12" width="32" height="30" rx="4" fill="#3D4A73" />
      <Circle cx="38" cy="22" r="6" fill="#F4D78A" />
      <Path d="M16 34c6-8 14-6 20 0 6 6 10 4 12 2v8H16z" fill="#6FA87A" />
      <Rect x="20" y="46" width="24" height="4" rx="2" fill="#E8A3AE" />
    </Board>
  );
}

function Lights({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Path
        d="M8 18c10 10 12-6 24 4 10 8 14-4 24 6"
        stroke={ink}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx="14" cy="26" r="5" fill="#F4D78A" stroke={ink} strokeWidth="1.6" />
      <Circle cx="32" cy="24" r="5" fill="#F3B7B0" stroke={ink} strokeWidth="1.6" />
      <Circle cx="50" cy="30" r="5" fill="#B9D4EA" stroke={ink} strokeWidth="1.6" />
      <Circle cx="14" cy="26" r="2" fill="#FFF6D8" />
      <Circle cx="32" cy="24" r="2" fill="#FFF0EA" />
      <Circle cx="50" cy="30" r="2" fill="#F4FBFF" />
    </Board>
  );
}

function Books({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Rect x="10" y="28" width="36" height="10" rx="2" fill="#E8897A" stroke={ink} strokeWidth="1.8" />
      <Rect x="14" y="18" width="36" height="10" rx="2" fill="#7BA6D6" stroke={ink} strokeWidth="1.8" />
      <Rect x="12" y="8" width="36" height="10" rx="2" fill="#F4D78A" stroke={ink} strokeWidth="1.8" />
      <Path d="M16 38v14c8 4 20 4 28 0V38" fill="#C98958" stroke={ink} strokeWidth="1.8" />
      <Rect x="20" y="42" width="18" height="3" rx="1.5" fill="#FFE4C8" />
    </Board>
  );
}

function Vinyl({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Rect x="8" y="14" width="34" height="34" rx="4" fill="#F3C39A" stroke={ink} strokeWidth="2" />
      <Circle cx="42" cy="40" r="16" fill="#2C2A32" stroke={ink} strokeWidth="2" />
      <Circle cx="42" cy="40" r="11" fill="#3D3A44" />
      <Circle cx="42" cy="40" r="4.5" fill="#E8897A" stroke={ink} strokeWidth="1.4" />
      <Circle cx="42" cy="40" r="1.4" fill="#FFF6EA" />
    </Board>
  );
}

function Moon({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Path
        d="M36 10c10 4 16 14 14 24-2 12-12 20-24 20-8 0-12-2-16-6 10 2 22-4 24-16 2-10-2-18-8-22 4 0 8 0 10 0z"
        fill="#F4E4B8"
        stroke={ink}
        strokeWidth="2"
      />
      <Circle cx="28" cy="28" r="2.4" fill="#E8C989" />
      <Circle cx="36" cy="38" r="1.8" fill="#E8C989" />
      <Path d="M22 18c6-2 8 4 4 6" stroke="#E8C989" strokeWidth="1.6" fill="none" />
    </Board>
  );
}

function Polaroid({ size }: ArtProps) {
  return (
    <Board size={size}>
      <G transform="rotate(-8 32 32)">
        <Rect x="12" y="8" width="40" height="48" rx="4" fill="#FFF9F2" stroke={ink} strokeWidth="2" />
        <Rect x="16" y="12" width="32" height="28" rx="2" fill="#B9D4EA" />
        <Circle cx="28" cy="22" r="5" fill="#F4D78A" />
        <Path d="M16 32c6-4 12 0 18 6 4 4 10 4 14 2v6H16z" fill="#8FCB9B" />
        <Rect x="22" y="44" width="18" height="3" rx="1.5" fill="#E8A3AE" />
      </G>
    </Board>
  );
}

function Radio({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Path d="M18 12l22 10" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <Circle cx="40" cy="12" r="3" fill="#E8897A" stroke={ink} strokeWidth="1.6" />
      <Rect x="10" y="22" width="44" height="28" rx="8" fill="#F3C39A" stroke={ink} strokeWidth="2" />
      <Circle cx="24" cy="36" r="8" fill="#FFF6EA" stroke={ink} strokeWidth="1.8" />
      <Circle cx="24" cy="36" r="3" fill="#5A3A32" />
      <Rect x="36" y="30" width="12" height="4" rx="2" fill="#E8897A" />
      <Rect x="36" y="38" width="12" height="4" rx="2" fill="#7BA6D6" />
    </Board>
  );
}

function Cookie({ size }: ArtProps) {
  return (
    <Board size={size}>
      <Path
        d="M14 34c0-12 10-22 22-20 2 8 10 8 12 2 6 6 6 18-2 26-8 8-22 8-30 2-4-3-2-8-2-10z"
        fill="#E8B87A"
        stroke={ink}
        strokeWidth="2"
      />
      <Circle cx="26" cy="30" r="2.4" fill="#5A3A32" />
      <Circle cx="36" cy="26" r="2" fill="#5A3A32" />
      <Circle cx="34" cy="38" r="2.2" fill="#5A3A32" />
      <Circle cx="44" cy="34" r="1.8" fill="#5A3A32" />
      <Path d="M22 22c4-8 12-8 14-2" stroke="#F4D78A" strokeWidth="2" fill="none" />
    </Board>
  );
}

const ARTS: Record<StickerKind, (props: ArtProps) => JSX.Element> = {
  cat: Cat,
  lamp: Lamp,
  mug: Mug,
  sprout: Sprout,
  poster: Poster,
  lights: Lights,
  books: Books,
  vinyl: Vinyl,
  moon: Moon,
  polaroid: Polaroid,
  radio: Radio,
  cookie: Cookie,
};

export function StickerArt({ kind, size = 64 }: { kind: StickerKind; size?: number }) {
  const Art = ARTS[kind];
  return <Art size={size} />;
}
