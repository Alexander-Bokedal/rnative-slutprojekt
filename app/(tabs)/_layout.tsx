import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useUserState from '@/stores/userStore';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useUserState((state) => state.user)

  const toggleLogin = useUserState((state) => state.toggleLogin)
  useEffect(() => {
    if (!user) router.replace('/(auth)')
  })
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPressIn={() => toggleLogin()}>
              <Text style={{ color: 'red' }}>Logout</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="listScreen"
        options={{

          headerShown: false,
          title: 'List',
          tabBarIcon: ({ color }) => <IconSymbol name="list.bullet" size={32} color={color} />
          ,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{

          headerShown: false,
          title: 'Recipes',
          tabBarIcon: ({ color }) => <IconSymbol name="fork.knife" size={32} color={color} />
          ,
        }}
      />
    </Tabs>
  );
}
