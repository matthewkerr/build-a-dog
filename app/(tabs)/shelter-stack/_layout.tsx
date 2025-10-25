import React from 'react';
import { Stack } from 'expo-router';

export default function ShelterLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="shelter" 
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
  );
}

