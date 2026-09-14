import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { nextId, STARTER_STICKERS, STICKER_SIZE } from '../data/catalog';
import { IsometricRoom } from '../room/IsometricRoom';
import { StickerArt } from '../stickers/StickerArt';
import { colors, shadow } from '../theme';
import type { PlacedSticker, StickerKind } from '../types';
import { DraggableSticker } from '../components/DraggableSticker';
import { StickerTray } from '../components/StickerTray';
import { TopBar } from '../components/TopBar';

type Ghost = { kind: StickerKind; x: number; y: number };

export function RoomScreen() {
  const insets = useSafeAreaInsets();
  const [stickers, setStickers] = useState<PlacedSticker[]>(STARTER_STICKERS);
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const canvasRef = useRef<View>(null);
  const rootRef = useRef<View>(null);
  const tapCount = useRef(0);
  const ghostKindRef = useRef<StickerKind | null>(null);

  const placeSticker = useCallback((kind: StickerKind, x: number, y: number) => {
    setStickers((current) => [...current, { id: nextId(kind), kind, x, y }]);
  }, []);

  const handleTap = useCallback(
    (kind: StickerKind) => {
      const n = tapCount.current;
      tapCount.current += 1;
      const x = 148 + (n % 4) * 18 - 8;
      const y = 176 + Math.floor(n / 4) * 16;
      placeSticker(kind, x, y);
    },
    [placeSticker],
  );

  const toRootPoint = (pageX: number, pageY: number, done: (x: number, y: number) => void) => {
    rootRef.current?.measureInWindow((rx, ry) => {
      done(pageX - rx, pageY - ry);
    });
  };

  const handleDragStart = useCallback((kind: StickerKind, pageX: number, pageY: number) => {
    toRootPoint(pageX, pageY, (x, y) => setGhost({ kind, x, y }));
  }, []);

  const handleDragMove = useCallback((pageX: number, pageY: number) => {
    toRootPoint(pageX, pageY, (x, y) => setGhost((g) => (g ? { ...g, x, y } : g)));
  }, []);

  const handleDragEnd = useCallback(
    (pageX: number, pageY: number) => {
      const kind = ghostKindRef.current;
      setGhost(null);
      ghostKindRef.current = null;
      if (!kind || pageX < 0 || pageY < 0) {
        return;
      }
      canvasRef.current?.measureInWindow((cx, cy, cw, ch) => {
        const x = pageX - cx - STICKER_SIZE / 2;
        const y = pageY - cy - STICKER_SIZE / 2;
        if (x < -STICKER_SIZE || y < -STICKER_SIZE || x > cw || y > ch) {
          return;
        }
        placeSticker(kind, Math.max(0, x), Math.max(0, y));
      });
    },
    [placeSticker],
  );

  const wrappedDragStart = useCallback(
    (kind: StickerKind, x: number, y: number) => {
      ghostKindRef.current = kind;
      handleDragStart(kind, x, y);
    },
    [handleDragStart],
  );

  const handleDragCancel = useCallback(() => {
    setGhost(null);
  }, []);

  const moveSticker = useCallback((id: string, x: number, y: number) => {
    setStickers((current) => current.map((item) => (item.id === id ? { ...item, x, y } : item)));
  }, []);

  const removeSticker = useCallback((id: string) => {
    setStickers((current) => current.filter((item) => item.id !== id));
  }, []);

  const selectSticker = useCallback((id: string) => {
    setStickers((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index < 0) {
        return current;
      }
      const next = [...current];
      const [picked] = next.splice(index, 1);
      next.push(picked);
      return next;
    });
  }, []);

  return (
    <View ref={rootRef} style={styles.root}>
      <LinearGradient colors={[colors.peachWash, '#F8DCC6', '#EED3B4']} style={StyleSheet.absoluteFill} />
      <View style={[styles.body, { paddingTop: Math.max(insets.top, 12) }]}>
        <TopBar />
        <View style={styles.stage}>
          <View ref={canvasRef} style={[styles.canvas, shadow.soft]} collapsable={false}>
            <IsometricRoom />
            {stickers.map((sticker) => (
              <DraggableSticker
                key={sticker.id}
                id={sticker.id}
                kind={sticker.kind}
                x={sticker.x}
                y={sticker.y}
                onMove={moveSticker}
                onRemove={removeSticker}
                onSelect={selectSticker}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
        <StickerTray
          onTap={handleTap}
          onDragStart={wrappedDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        />
      </View>
      {ghost ? (
        <View pointerEvents="none" style={styles.ghostLayer}>
          <View
            style={[
              styles.ghost,
              {
                transform: [{ translateX: ghost.x - STICKER_SIZE / 2 }, { translateY: ghost.y - STICKER_SIZE - 8 }],
              },
            ]}
          >
            <StickerArt kind={ghost.kind} size={STICKER_SIZE} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  canvas: {
    width: '100%',
    maxWidth: 380,
    aspectRatio: 420 / 390,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#F3D7B8',
  },
  ghostLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  ghost: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
