import { useEffect, useMemo, useRef } from 'react';
import { PanResponder, Platform, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { STICKER_SIZE } from '../data/catalog';
import { StickerArt } from '../stickers/StickerArt';
import { shadow } from '../theme';
import type { StickerKind } from '../types';

type Props = {
  id: string;
  kind: StickerKind;
  x: number;
  y: number;
  onMove: (id: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};

export function DraggableSticker({ id, kind, x, y, onMove, onRemove, onSelect }: Props) {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);
  const originX = useSharedValue(x);
  const originY = useSharedValue(y);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbacks = useRef({ id, onMove, onRemove, onSelect });
  callbacks.current = { id, onMove, onRemove, onSelect };

  useEffect(() => {
    translateX.value = x;
    translateY.value = y;
  }, [x, y, translateX, translateY]);

  const longPress = Gesture.LongPress()
    .minDuration(460)
    .maxDistance(12)
    .onStart(() => {
      scale.value = withTiming(0.15, { duration: 180 });
      opacity.value = withTiming(0, { duration: 180 });
      runOnJS(onRemove)(id);
    });

  const pan = Gesture.Pan()
    .minDistance(4)
    .onStart(() => {
      originX.value = translateX.value;
      originY.value = translateY.value;
      scale.value = withSpring(1.12, { damping: 16, stiffness: 220 });
      runOnJS(onSelect)(id);
    })
    .onUpdate((event) => {
      translateX.value = originX.value + event.translationX;
      translateY.value = originY.value + event.translationY;
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 16, stiffness: 220 });
      runOnJS(onMove)(id, translateX.value, translateY.value);
    });

  const composed = Gesture.Simultaneous(pan, longPress);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2,
        onPanResponderGrant: () => {
          originX.value = translateX.value;
          originY.value = translateY.value;
          scale.value = withSpring(1.12, { damping: 16, stiffness: 220 });
          callbacks.current.onSelect(callbacks.current.id);
          const startX = translateX.value;
          const startY = translateY.value;
          longPressTimer.current = setTimeout(() => {
            if (Math.abs(translateX.value - startX) < 12 && Math.abs(translateY.value - startY) < 12) {
              scale.value = withTiming(0.15, { duration: 180 });
              opacity.value = withTiming(0, { duration: 180 });
              callbacks.current.onRemove(callbacks.current.id);
            }
          }, 480);
        },
        onPanResponderMove: (_, gesture) => {
          if (Math.abs(gesture.dx) > 12 || Math.abs(gesture.dy) > 12) {
            if (longPressTimer.current) {
              clearTimeout(longPressTimer.current);
              longPressTimer.current = null;
            }
          }
          translateX.value = originX.value + gesture.dx;
          translateY.value = originY.value + gesture.dy;
        },
        onPanResponderRelease: (_, gesture) => {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
          scale.value = withSpring(1, { damping: 16, stiffness: 220 });
          callbacks.current.onMove(
            callbacks.current.id,
            originX.value + gesture.dx,
            originY.value + gesture.dy,
          );
        },
        onPanResponderTerminate: () => {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
          scale.value = withSpring(1, { damping: 16, stiffness: 220 });
        },
      }),
    [opacity, originX, originY, scale, translateX, translateY],
  );

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const node = (
    <Animated.View
      collapsable={false}
      style={[
        styles.wrap,
        style,
        { pointerEvents: 'box-none' },
        Platform.OS === 'web' ? ({ touchAction: 'none' } as object) : null,
      ]}
    >
      <View
        collapsable={false}
        testID={`placed-${id}`}
        {...(Platform.OS === 'web' ? panResponder.panHandlers : {})}
        style={styles.hit}
      >
        <StickerArt kind={kind} size={STICKER_SIZE} />
      </View>
    </Animated.View>
  );

  if (Platform.OS === 'web') {
    return node;
  }

  return <GestureDetector gesture={composed}>{node}</GestureDetector>;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: STICKER_SIZE,
    height: STICKER_SIZE,
    ...shadow.sticker,
  },
  hit: {
    width: STICKER_SIZE,
    height: STICKER_SIZE,
  },
});
