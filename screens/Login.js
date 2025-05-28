// screens/Login.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        // Armazena o token para persistência
        AsyncStorage.setItem('userToken', userCredential.user.uid)
          .catch(err => console.warn('Erro salvando token:', err));
        // Redireciona para FormScreen substituindo a pilha
        navigation.replace('FormScreen');
      })
      .catch(err => {
        console.error(err);
        setError('Reabra o aplicativo.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo de volta!</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.button}>
        <Button title="Entrar" onPress={handleLogin} color="#FF6347" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  button: {
    marginTop: 12,
  },
});
