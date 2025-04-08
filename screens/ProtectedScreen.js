// screens/ProtectedScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../firebase';

export default function ProtectedScreen() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to Protected Screen!</Text>
      <Text style={{ marginBottom: 20 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}