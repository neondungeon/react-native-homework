import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

export default function CepLookupScreen() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  const handleLookup = async () => {
    const cleanCep = cep.replace(/[^0-9]/g, '');
    if (cleanCep.length !== 8) {
      Alert.alert('CEP inválido', 'O CEP deve conter 8 dígitos numéricos.');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        Alert.alert('CEP não encontrado', 'Não foi possível encontrar o CEP informado.');
      } else {
        setAddress({
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      }
    } catch (err) {
      Alert.alert('Erro', 'Falha ao consultar o serviço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP (apenas números)"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />

      <TouchableOpacity style={styles.button} onPress={handleLookup}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </TouchableOpacity>

      {address.cep !== '' && (
        <View style={styles.result}>
          <Text style={styles.label}>CEP: <Text style={styles.value}>{address.cep}</Text></Text>
          <Text style={styles.label}>Logradouro: <Text style={styles.value}>{address.logradouro}</Text></Text>
          <Text style={styles.label}>Complemento: <Text style={styles.value}>{address.complemento}</Text></Text>
          <Text style={styles.label}>Bairro: <Text style={styles.value}>{address.bairro}</Text></Text>
          <Text style={styles.label}>Cidade: <Text style={styles.value}>{address.localidade}</Text></Text>
          <Text style={styles.label}>UF: <Text style={styles.value}>{address.uf}</Text></Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  result: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  value: {
    fontWeight: 'normal',
  },
});
