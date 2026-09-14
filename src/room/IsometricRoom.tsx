import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

import { iso, isoPath, ROOM_VB } from './iso';

function IsoBox({
  x0,
  y0,
  x1,
  y1,
  z0 = 0,
  z1,
  top,
  left,
  right,
  stroke = '#C98958',
}: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  z0?: number;
  z1: number;
  top: string;
  left: string;
  right: string;
  stroke?: string;
}) {
  return (
    <G>
      <Path
        d={isoPath([
          [x0, y1, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          [x0, y1, z1],
        ])}
        fill={left}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <Path
        d={isoPath([
          [x1, y0, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          [x1, y0, z1],
        ])}
        fill={right}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <Path
        d={isoPath([
          [x0, y0, z1],
          [x1, y0, z1],
          [x1, y1, z1],
          [x0, y1, z1],
        ])}
        fill={top}
        stroke={stroke}
        strokeWidth={1.2}
      />
    </G>
  );
}

export function IsometricRoom() {
  const floor = isoPath([
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ]);
  const leftWall = isoPath([
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ]);
  const rightWall = isoPath([
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 1],
    [0, 0, 1],
  ]);

  const window = isoPath([
    [0.28, 0, 0.78],
    [0.74, 0, 0.78],
    [0.74, 0, 0.3],
    [0.28, 0, 0.3],
  ]);
  const windowInner = isoPath([
    [0.32, 0, 0.74],
    [0.7, 0, 0.74],
    [0.7, 0, 0.34],
    [0.32, 0, 0.34],
  ]);

  const rug = isoPath([
    [0.42, 0.32, 0.01],
    [0.88, 0.32, 0.01],
    [0.88, 0.78, 0.01],
    [0.42, 0.78, 0.01],
  ]);

  const planks = [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84].map((t) => {
    const a = iso(t, 0.02, 0);
    const b = iso(t, 0.98, 0);
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  });

  const lantern = iso(0.12, 0.12, 0.82);

  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${ROOM_VB.w} ${ROOM_VB.h}`} pointerEvents="none">
      <Defs>
        <LinearGradient id="leftWall" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF7EC" />
          <Stop offset="1" stopColor="#F6E0C4" />
        </LinearGradient>
        <LinearGradient id="rightWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F8D9B5" />
          <Stop offset="1" stopColor="#EFC49A" />
        </LinearGradient>
        <LinearGradient id="floor" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E8C089" />
          <Stop offset="1" stopColor="#C98958" />
        </LinearGradient>
        <LinearGradient id="night" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#3D4A73" />
          <Stop offset="1" stopColor="#8FA6D4" />
        </LinearGradient>
      </Defs>

      <Path
        d={isoPath([
          [-0.08, -0.08, -0.04],
          [1.08, -0.08, -0.04],
          [1.08, 1.08, -0.04],
          [-0.08, 1.08, -0.04],
        ])}
        fill="#A86B3C"
      />
      <Path
        d={isoPath([
          [-0.08, -0.08, 1.06],
          [0, -0.02, 1],
          [0, -0.02, 0],
          [-0.08, -0.08, -0.04],
        ])}
        fill="#8F5A32"
      />
      <Path
        d={isoPath([
          [-0.08, -0.08, 1.06],
          [1.08, -0.08, 1.06],
          [1.02, -0.02, 1],
          [0, -0.02, 1],
        ])}
        fill="#C98958"
      />

      <Path d={leftWall} fill="url(#leftWall)" stroke="#E8C9A0" strokeWidth={1} />
      <Path d={rightWall} fill="url(#rightWall)" stroke="#E0B888" strokeWidth={1} />
      <Path d={floor} fill="url(#floor)" stroke="#B87A48" strokeWidth={1.4} />

      {planks.map((d) => (
        <Path key={d} d={d} stroke="#B87A48" strokeWidth={1} opacity={0.28} />
      ))}

      <Path
        d={isoPath([
          [0, 0, 0.08],
          [0, 1, 0.08],
          [0, 1, 0.11],
          [0, 0, 0.11],
        ])}
        fill="#F3D7B8"
      />
      <Path
        d={isoPath([
          [0, 0, 0.08],
          [1, 0, 0.08],
          [1, 0, 0.11],
          [0, 0, 0.11],
        ])}
        fill="#E8C09A"
      />

      <Path d={window} fill="#F4E4C8" stroke="#C98958" strokeWidth={1.6} />
      <Path d={windowInner} fill="url(#night)" />
      <Path
        d={`M ${iso(0.51, 0, 0.74).x} ${iso(0.51, 0, 0.74).y} L ${iso(0.51, 0, 0.34).x} ${iso(0.51, 0, 0.34).y}`}
        stroke="#F4E4C8"
        strokeWidth={2}
      />
      <Path
        d={`M ${iso(0.32, 0, 0.54).x} ${iso(0.32, 0, 0.54).y} L ${iso(0.7, 0, 0.54).x} ${iso(0.7, 0, 0.54).y}`}
        stroke="#F4E4C8"
        strokeWidth={2}
      />
      <Circle cx={iso(0.62, 0, 0.66).x} cy={iso(0.62, 0, 0.66).y} r="7" fill="#F4D78A" />
      <Circle cx={iso(0.4, 0, 0.62).x} cy={iso(0.4, 0, 0.62).y} r="1.6" fill="#FFF6EA" />
      <Circle cx={iso(0.46, 0, 0.7).x} cy={iso(0.46, 0, 0.7).y} r="1.2" fill="#FFF6EA" />

      <Path d={rug} fill="#E8A3AE" opacity={0.92} />
      <Path
        d={isoPath([
          [0.5, 0.4, 0.015],
          [0.8, 0.4, 0.015],
          [0.8, 0.7, 0.015],
          [0.5, 0.7, 0.015],
        ])}
        fill="#F6C9C8"
        opacity={0.7}
      />

      <IsoBox
        x0={0.06}
        y0={0.38}
        x1={0.46}
        y1={0.92}
        z1={0.07}
        top="#D9A078"
        left="#C98958"
        right="#B87A48"
      />
      <IsoBox
        x0={0.08}
        y0={0.4}
        x1={0.44}
        y1={0.9}
        z0={0.07}
        z1={0.2}
        top="#F4B7B0"
        left="#E8897A"
        right="#F3C3B8"
        stroke="#D97A6E"
      />
      <IsoBox
        x0={0.1}
        y0={0.78}
        x1={0.28}
        y1={0.9}
        z0={0.2}
        z1={0.28}
        top="#FFF6EA"
        left="#F0D8C4"
        right="#E8C9B0"
        stroke="#D7B08A"
      />
      <IsoBox
        x0={0.3}
        y0={0.78}
        x1={0.42}
        y1={0.9}
        z0={0.2}
        z1={0.26}
        top="#FFF6EA"
        left="#F0D8C4"
        right="#E8C9B0"
        stroke="#D7B08A"
      />

      <IsoBox
        x0={0.08}
        y0={0.16}
        x1={0.26}
        y1={0.34}
        z1={0.18}
        top="#E8C39A"
        left="#D4A574"
        right="#C98958"
      />
      <IsoBox
        x0={0.1}
        y0={0.18}
        x1={0.24}
        y1={0.32}
        z0={0.18}
        z1={0.2}
        top="#F6E4CF"
        left="#E8C9A0"
        right="#E0B888"
        stroke="#D7B08A"
      />

      <IsoBox
        x0={0.78}
        y0={0.08}
        x1={0.94}
        y1={0.24}
        z1={0.12}
        top="#C98958"
        left="#B87A48"
        right="#A86B3C"
      />
      <Circle cx={iso(0.86, 0.16, 0.28).x} cy={iso(0.86, 0.16, 0.28).y} r="16" fill="#8FCB9B" />
      <Circle cx={iso(0.82, 0.2, 0.34).x} cy={iso(0.82, 0.2, 0.34).y} r="11" fill="#7BBF8A" />
      <Circle cx={iso(0.9, 0.12, 0.36).x} cy={iso(0.9, 0.12, 0.36).y} r="9" fill="#A6DBB0" />

      <Circle cx={lantern.x} cy={lantern.y} r="11" fill="#F7E2A0" stroke="#C98958" strokeWidth={1.4} />
      <Circle cx={lantern.x} cy={lantern.y - 2} r="4" fill="#FFF6D8" />
      <Path
        d={`M ${lantern.x} ${iso(0.12, 0.12, 1).y} L ${lantern.x} ${lantern.y - 11}`}
        stroke="#C98958"
        strokeWidth={1.6}
      />
    </Svg>
  );
}
