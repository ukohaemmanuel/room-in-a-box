import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PhoneShell } from './src/components/PhoneShell';
import { RoomScreen } from './src/screens/RoomScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <PhoneShell>
          <RoomScreen />
        </PhoneShell>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
