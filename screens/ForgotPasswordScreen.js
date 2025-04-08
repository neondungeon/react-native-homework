// screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox for further instructions.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      {message ? <Text style={{ color: 'green', marginBottom: 10 }}>{message}</Text> : null}

      <Button title="Send Reset Instructions" onPress={handleResetPassword} />
      
      <Button
        title="Back to Login"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 15 }}
      />
    </View>
  );
}