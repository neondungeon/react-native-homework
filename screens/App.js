// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Screens
import AuthScreen from './screens/AuthScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProtectedScreen from './screens/ProtectedScreen';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Protected" component={ProtectedScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen} 
              options={{ title: 'Reset Password' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}