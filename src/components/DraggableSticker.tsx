import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
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

  const composed = Gesture.Exclusive(longPress, pan);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View collapsable={false} style={[styles.wrap, style]}>
        <StickerArt kind={kind} size={STICKER_SIZE} />
      </Animated.View>
    </GestureDetector>
  );
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
});
