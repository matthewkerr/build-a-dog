import React from 'react';
import { Stack } from 'expo-router';
import { FlowProvider } from '@/contexts/FlowContext';

export default function FlowLayout() {
  return (
    <FlowProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="size" />
        <Stack.Screen name="energy" />
        <Stack.Screen name="kids" />
        <Stack.Screen name="pets" />
        <Stack.Screen name="grooming" />
        <Stack.Screen 
          name="results" 
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="browse" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="breed-detail-flow" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FlowProvider>
  );
}
