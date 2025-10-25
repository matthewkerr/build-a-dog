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
      initialRouteName="index"
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
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
        <Tabs.Screen
          name="favorites-stack"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
            headerShown: false,
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
          name="tips-stack"
          options={{
            title: 'Tips',
            tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb-o" color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings-stack"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            headerShown: false,
          }}
        />
        {/* Hidden stack screens - registered for routing but not visible in tab bar */}
        <Tabs.Screen
          name="flow-stack"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search-stack"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="browse-stack"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="adoption-stack"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="shelter-stack"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="senior-stack"
          options={{
            href: null,
            headerShown: false,
          }}
        />
    </Tabs>
  );
}
