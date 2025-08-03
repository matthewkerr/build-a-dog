import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/components/useColorScheme';
import { DatabaseProvider, useDatabaseContext } from '@/contexts/DatabaseContext';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.light.primaryTeal} />
      <Text style={styles.loadingText}>Loading Build-a-Dog...</Text>
    </View>
  );
}

function AppContent() {
  const { isInitialized, isLoading } = useDatabaseContext();
  const [showLoading, setShowLoading] = useState(true);

  console.log('AppContent - isLoading:', isLoading, 'isInitialized:', isInitialized);

  useEffect(() => {
    // Show loading screen for at least 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !isInitialized || showLoading) {
    console.log('Showing loading screen');
    return <LoadingScreen />;
  }

  console.log('Showing main app');
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: true }} />
      <Stack.Screen name="breed-detail" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootLayoutNav() {
  // Force light theme
  const colorScheme = 'light';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DatabaseProvider>
        <ThemeProvider value={DefaultTheme}>
          <AppContent />
        </ThemeProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundIvory,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textCharcoal,
    marginTop: 20,
  },
});
