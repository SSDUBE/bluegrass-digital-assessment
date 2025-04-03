import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList, RootStackParamList } from './types';

// Import screens
import ResultsListingScreen from '../screens/ResultsListing/ResultsListingScreen.tsx';
import ResultsDetailsScreen from '../screens/ResultsDetails/ResultsDetailsScreen.tsx';

// Create navigators
const MainStack = createNativeStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="ResultsListing" component={ResultsListingScreen} />
      <MainStack.Screen name="ResultsDetails" component={ResultsDetailsScreen} />
    </MainStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
        }}>
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
