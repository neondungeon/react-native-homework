// screens/AuthScreen.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <Button
        title={isSignUp ? "Entrar" : "Registrar"}
        onPress={handleAuth}
      />
      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={{ color: 'blue' }}>
          {isSignUp ? "Mudar para Entrar" : "Mudar para Registrar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={{ color: 'blue' }}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
}