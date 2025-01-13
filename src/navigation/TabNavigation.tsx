import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntryScreen from '../screens/entryModule/EntryScreen';
import ExitScreen from '../screens/exitModule/ExitScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = (route.name === 'Entry' ? 'log-in' : 'log-out') + (focused ? '' : '-outline');
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: `routeNames.${route.name}`,
        tabBarActiveTintColor: 'darkblue',
        tabBarInactiveTintColor: 'grey',
        labelStyle: { fontSize: 10, fontWeight: '500' }
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name='Entry'
        component={EntryScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name='Exit'
        component={ExitScreen}
      />
    </Tab.Navigator>
  );
}
export default TabNavigator;
