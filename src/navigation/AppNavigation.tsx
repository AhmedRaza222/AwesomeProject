import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginModule/LoginScreen';
import RegisterScreen from '../screens/registerModule/RegisterScreen';
import TabNavigator from '../navigation/TabNavigation'; // Main app navigation

const Stack = createStackNavigator(); 

const AppNavigation: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="App"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
