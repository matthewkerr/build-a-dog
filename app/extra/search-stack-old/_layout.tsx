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
        <Stack.Screen 
          name="size" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="energy" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="kids" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="pets" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="grooming" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="results" 
          options={{
            headerShown: false,
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
        <Stack.Screen 
          name="adoption" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="tips" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="favorites" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FlowProvider>
  );
}
