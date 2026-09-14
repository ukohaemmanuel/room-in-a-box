import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, shadow } from '../theme';

export function TopBar() {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.kicker}>pocket home</Text>
        <Text style={styles.title}>Room in a Box</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Share room"
        onPress={() =>
          Alert.alert('Share', 'This sample keeps the diorama in your pocket — sharing is a no-op for now.')
        }
        style={({ pressed }) => [styles.share, pressed && styles.sharePressed]}
      >
        <Text style={styles.shareText}>Share</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  kicker: {
    color: colors.inkSoft,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  share: {
    backgroundColor: colors.share,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    ...shadow.soft,
  },
  sharePressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  shareText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
});
