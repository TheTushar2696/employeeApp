// RootNavigator.ts
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EmployeeDetails from '../screens/EmployeeDetails';

export type RootStackParamList = {
  Home: undefined;
  EmployeeDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          options={{
            animationEnabled: true,
          }}
          name={'Home'}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            animationEnabled: true,
          }}
          name={'EmployeeDetails'}
          component={EmployeeDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
