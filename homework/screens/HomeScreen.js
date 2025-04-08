import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Entrar" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Registrar" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Esqueci minha senha" onPress={() => navigation.navigate('ForgotPassword')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});