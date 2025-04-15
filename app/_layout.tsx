import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReduxProvider from '../store/ReduxProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="results" options={{ headerShown: false }} />
          <Stack.Screen 
            name="result/[id]" 
            options={{ 
              headerShown: false,
              presentation: 'card'
            }} 
          />
        </Stack>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
