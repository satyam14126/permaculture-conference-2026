import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProgramScreen from '../screens/ProgramScreen';
import MapScreen from '../screens/MapScreen';
import ContactScreen from '../screens/ContactScreen';
import HowToReachScreen from '../screens/HowToReachScreen';
import SpeakerDetailScreen from '../screens/SpeakerDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProgramStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProgramMain" component={ProgramScreen} />
      <Stack.Screen name="SpeakerDetail" component={SpeakerDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator({ onLogout }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2d5016' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#4a7c23',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 8 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</TabBarIcon>,
          }}
        />
        <Tab.Screen
          name="Program"
          component={ProgramStack}
          options={{
            title: 'Program',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📋</TabBarIcon>,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Map',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🗺️</TabBarIcon>,
          }}
        />
        <Tab.Screen
          name="How to Reach"
          component={HowToReachScreen}
          options={{
            title: 'Reach',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🚗</TabBarIcon>,
          }}
        />
        <Tab.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            title: 'Contact',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📞</TabBarIcon>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
