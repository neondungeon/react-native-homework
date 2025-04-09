import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Entrar" onPress={() => navigation.navigate('ENTRAR')} />
      <Button title="Registrar" onPress={() => navigation.navigate('REGISTRAR')} />
      <Button title="Esqueci minha senha" onPress={() => navigation.navigate('ESQUECI MINHA SENHA')} />
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
