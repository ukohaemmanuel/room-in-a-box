import { Platform, type ViewStyle } from 'react-native';

export const colors = {
  peachWash: '#F6E4CF',
  peachDeep: '#EED6BC',
  cream: '#FFF6EA',
  paper: '#FFF9F2',
  wood: '#C98958',
  woodDark: '#A86B3C',
  ink: '#5A3A32',
  inkSoft: '#8A6558',
  blush: '#F3B7B0',
  sage: '#B7D3C4',
  butter: '#F4D78A',
  sky: '#B9D4EA',
  lilac: '#D9C6EA',
  mint: '#C9E4D4',
  apricot: '#F3C39A',
  rose: '#E8A3AE',
  white: '#FFFFFF',
  share: '#E8897A',
} as const;

function makeShadow(web: string, native: ViewStyle): ViewStyle {
  return Platform.select({
    web: { boxShadow: web } as ViewStyle,
    default: native,
  }) as ViewStyle;
}

export const shadow = {
  soft: makeShadow('0 8px 16px rgba(138, 90, 58, 0.16)', {
    shadowColor: '#8A5A3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  }),
  sticker: makeShadow('0 4px 6px rgba(107, 63, 42, 0.22)', {
    shadowColor: '#6B3F2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 5,
  }),
  tray: makeShadow('0 -4px 18px rgba(122, 74, 50, 0.12)', {
    shadowColor: '#7A4A32',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 12,
  }),
};
