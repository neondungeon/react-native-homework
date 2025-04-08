// screens/ProtectedScreen.js
import React                  from 'react';
import { auth }               from '../firebase';
import { View, Text, Button } from 'react-native';

export default function ProtectedScreen() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Bem-vindo ao aplicativo!</Text>
      <Text style={{ marginBottom: 20 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
}