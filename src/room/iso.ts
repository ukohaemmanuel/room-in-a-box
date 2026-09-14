export const ROOM_VB = { w: 420, h: 390 } as const;

const CX = 210;
const FLOOR_TOP = 196;
const HW = 168;
const HH = 84;
const WALL = 150;

export function iso(x: number, y: number, z = 0) {
  return {
    x: CX + (x - y) * HW,
    y: FLOOR_TOP + (x + y) * HH - z * WALL,
  };
}

export function isoPath(points: [number, number, number][]): string {
  return (
    points
      .map((point, index) => {
        const { x, y } = iso(point[0], point[1], point[2]);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ') + ' Z'
  );
}
