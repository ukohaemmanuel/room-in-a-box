export type StickerKind =
  | 'cat'
  | 'lamp'
  | 'mug'
  | 'sprout'
  | 'poster'
  | 'lights'
  | 'books'
  | 'vinyl'
  | 'moon'
  | 'polaroid'
  | 'radio'
  | 'cookie';

export type PlacedSticker = {
  id: string;
  kind: StickerKind;
  x: number;
  y: number;
};

export type StickerSpec = {
  kind: StickerKind;
  label: string;
  trayBg: string;
};
