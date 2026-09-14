import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { STICKER_CATALOG, TRAY_STICKER_SIZE } from '../data/catalog';
import { StickerArt } from '../stickers/StickerArt';
import { colors, shadow } from '../theme';
import type { StickerKind } from '../types';

type Props = {
  onTap: (kind: StickerKind) => void;
  onDragStart: (kind: StickerKind, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: (x: number, y: number) => void;
  onDragCancel: () => void;
};

function TrayChip({
  kind,
  label,
  trayBg,
  onTap,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragCancel,
}: {
  kind: StickerKind;
  label: string;
  trayBg: string;
  onTap: (kind: StickerKind) => void;
  onDragStart: (kind: StickerKind, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: (x: number, y: number) => void;
  onDragCancel: () => void;
}) {
  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onTap)(kind);
  });

  const pan = Gesture.Pan()
    .activeOffsetY([-12, 12])
    .failOffsetX([-24, 24])
    .onStart((event) => {
      runOnJS(onDragStart)(kind, event.absoluteX, event.absoluteY);
    })
    .onUpdate((event) => {
      runOnJS(onDragMove)(event.absoluteX, event.absoluteY);
    })
    .onEnd((event) => {
      runOnJS(onDragEnd)(event.absoluteX, event.absoluteY);
    })
    .onFinalize(() => {
      runOnJS(onDragCancel)();
    });

  const composed = Gesture.Exclusive(pan, tap);

  return (
    <GestureDetector gesture={composed}>
      <View collapsable={false} style={styles.chipWrap}>
        <View style={[styles.chip, { backgroundColor: trayBg }]}>
          <StickerArt kind={kind} size={TRAY_STICKER_SIZE} />
        </View>
        <Text style={styles.chipLabel}>{label}</Text>
      </View>
    </GestureDetector>
  );
}

export function StickerTray({ onTap, onDragStart, onDragMove, onDragEnd, onDragCancel }: Props) {
  return (
    <View style={styles.tray}>
      <View style={styles.handle} />
      <View style={styles.headerRow}>
        <Text style={styles.title}>Sticker tray</Text>
        <Text style={styles.hint}>tap or drag · hold to peel off</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {STICKER_CATALOG.map((sticker) => (
          <TrayChip
            key={sticker.kind}
            kind={sticker.kind}
            label={sticker.label}
            trayBg={sticker.trayBg}
            onTap={onTap}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tray: {
    backgroundColor: colors.paper,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    ...shadow.tray,
  },
  handle: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: 99,
    backgroundColor: '#E8C9B0',
    marginBottom: 8,
  },
  headerRow: {
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: 0.2,
  },
  hint: {
    fontSize: 11,
    color: colors.inkSoft,
  },
  row: {
    paddingHorizontal: 16,
    gap: 10,
  },
  chipWrap: {
    alignItems: 'center',
    width: 76,
  },
  chip: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  chipLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '700',
    color: colors.inkSoft,
  },
});
