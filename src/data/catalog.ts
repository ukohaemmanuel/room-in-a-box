import type { PlacedSticker, StickerKind, StickerSpec } from '../types';

export const STICKER_CATALOG: StickerSpec[] = [
  { kind: 'cat', label: 'Cat', trayBg: '#F8D4B8' },
  { kind: 'lamp', label: 'Lamp', trayBg: '#F7E2A8' },
  { kind: 'mug', label: 'Mug', trayBg: '#F4C9C4' },
  { kind: 'sprout', label: 'Plant', trayBg: '#C9E4D4' },
  { kind: 'poster', label: 'Poster', trayBg: '#D9C6EA' },
  { kind: 'lights', label: 'Lights', trayBg: '#F8E6B0' },
  { kind: 'books', label: 'Books', trayBg: '#C9D8F0' },
  { kind: 'vinyl', label: 'Vinyl', trayBg: '#E8D0C4' },
  { kind: 'moon', label: 'Moon', trayBg: '#DCE4F5' },
  { kind: 'polaroid', label: 'Photo', trayBg: '#F3E4D0' },
  { kind: 'radio', label: 'Radio', trayBg: '#F3C39A' },
  { kind: 'cookie', label: 'Treat', trayBg: '#E8C9A8' },
];

export const STARTER_STICKERS: PlacedSticker[] = [
  { id: 'starter-lights', kind: 'lights', x: 138, y: 46 },
  { id: 'starter-poster', kind: 'poster', x: 58, y: 78 },
  { id: 'starter-lamp', kind: 'lamp', x: 86, y: 148 },
  { id: 'starter-cat', kind: 'cat', x: 108, y: 188 },
  { id: 'starter-books', kind: 'books', x: 206, y: 186 },
  { id: 'starter-mug', kind: 'mug', x: 168, y: 222 },
  { id: 'starter-vinyl', kind: 'vinyl', x: 196, y: 232 },
];

export const STICKER_SIZE = 64;
export const TRAY_STICKER_SIZE = 48;

export function nextId(kind: StickerKind): string {
  return `${kind}-${Date.now().toString(36)}-${Math.floor(Math.random() * 999)}`;
}
