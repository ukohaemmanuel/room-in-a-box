import { Platform, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

import { colors, shadow } from '../theme';

const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 844;

export function PhoneShell({ children }: { children: ReactNode }) {
  if (Platform.OS !== 'web') {
    return <View style={styles.fill}>{children}</View>;
  }

  return (
    <View style={styles.webStage}>
      <View style={styles.phone}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  webStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.peachDeep,
    padding: 24,
  },
  phone: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.peachWash,
    borderWidth: 10,
    borderColor: '#4A3128',
    ...shadow.soft,
  },
});
