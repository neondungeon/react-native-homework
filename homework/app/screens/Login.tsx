import React, { useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { 
  View, 
  Button, 
  StyleSheet, 
  TextInput, 
  ActivityIndicator, 
  KeyboardAvoidingView,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Não foi possível entrar na sua conta: ' + error);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Usuário criado com êxito! Verifique o seu Inbox');
    } catch (error) {
      console.log(error);
      alert('Não foi possível criar sua conta: ' + error);
    } finally {
      setLoading(false);
    }
  }

  const resetPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Um email de redefinição de senha foi enviado para ' + email);
    } catch (error) {
      console.log(error);
      alert('Não foi possível enviar o email de redefinição de senha: ' + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        {isResetPassword ? (
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
          ></TextInput>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              value={password}
            ></TextInput>
          </>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff"/>
        ) : (
          <>
            {isResetPassword ? (
              <Button title="Enviar Email de Redefinição" onPress={resetPassword}></Button>
            ) : (
              <>
                <Button title="Fazer Login" onPress={signIn}></Button>
                <Button title="Criar Conta" onPress={signUp}></Button>
              </>
            )}
            <Button
              title={isResetPassword ? "Voltar" : "Esqueci minha senha"} 
              onPress={() => setIsResetPassword(!isResetPassword)}
            ></Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  forgotPasswordButton: {
    marginTop: 10
  }
});
