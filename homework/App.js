import React from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen   from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DestinationScreen from './screens/DestinationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="INÍCIO" component={HomeScreen} />
        <Stack.Screen name="ENTRAR" component={SignInScreen} />
        <Stack.Screen name="REGISTRAR" component={SignUpScreen} />
        <Stack.Screen name="ESQUECI MINHA SENHA" component={ForgotPasswordScreen} />
        <Stack.Screen name="APLICATIVO" component={DestinationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}