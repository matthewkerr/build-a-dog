import React from 'react';
import { Stack } from 'expo-router';

export default function TipsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="tips" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
