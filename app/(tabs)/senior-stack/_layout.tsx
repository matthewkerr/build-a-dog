import React from 'react';
import { Stack } from 'expo-router';

export default function SeniorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="senior" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
