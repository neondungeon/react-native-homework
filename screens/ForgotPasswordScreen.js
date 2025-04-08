// screens/ForgotPasswordScreen.js
import React, { useState } from               'react';
import { auth } from                          '../firebase';
import { sendPasswordResetEmail } from        'firebase/auth';
import { View, TextInput, Button, Text } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('E-mail de redefinição de senha enviado.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Digite o seu Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      {message ? <Text style={{ color: 'green', marginBottom: 10 }}>{message}</Text> : null}

      <Button title="Enviar E-mail de redefinição de senha" onPress={handleResetPassword} />
      
      <Button
        title="Voltar para Login"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 15 }}
      />
    </View>
  );
}