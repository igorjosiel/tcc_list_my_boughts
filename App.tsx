import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirstScreen from './screens/FirstScreen/FirstScreen';
import { Theme } from './templates/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstScreen'>
        <Stack.Screen name="FirstScreen" component={FirstScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}