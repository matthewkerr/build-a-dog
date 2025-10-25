import React from 'react';
import { Stack } from 'expo-router';

export default function BrowseLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
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
  );
}
