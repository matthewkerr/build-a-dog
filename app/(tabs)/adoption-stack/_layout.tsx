import React from 'react';
import { Stack } from 'expo-router';

export default function AdoptionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="adoption" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
