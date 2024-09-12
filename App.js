// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screen/LoginScreen';
import SignupScreen from './screen/SignupScreen';
import HomeScreen from './screen/HomeScreen';
import AccountScreen from './screen/AccountScreen';
import NotificationsScreen from './screen/NotificationsScreen';
import BoardsScreen from './screen/BoardsScreen';
import { HomeIcon, NotificationsIcon, AccountIcon } from './assets/icons'; // Importez vos icônes SVG

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Boards') {
            iconName = <HomeIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'Notifications') {
            iconName = <NotificationsIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'Account') {
            iconName = <AccountIcon width={size} height={size} fill={color} />;
          }
          return iconName;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Boards" component={BoardsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
