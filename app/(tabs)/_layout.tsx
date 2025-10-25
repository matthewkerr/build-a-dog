import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // Force light theme
  const colorScheme = 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: Colors.light.backgroundIvory,
        },
        headerStyle: {
          backgroundColor: Colors.light.backgroundIvory,
        },
        headerTintColor: Colors.light.textCharcoal,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Find Match',
          tabBarIcon: ({ color }) => <TabBarIcon name="magic" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors.light.textCharcoal}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse Dogs',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="adoption"
        options={{
          title: 'Adoption',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
              <Tabs.Screen
          name="tips"
          options={{
            title: 'Tips',
            tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="flow"
          options={{
            title: 'Flow',
            tabBarIcon: ({ color }) => <TabBarIcon name="random" color={color} />,
          }}
        />
    </Tabs>
  );
}
