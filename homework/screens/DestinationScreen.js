import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

export default function DestinationScreen({ navigation }) {
  const handleSignOut = () => {
    auth.signOut().then(() => navigation.replace('Home'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! You are signed in.</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});