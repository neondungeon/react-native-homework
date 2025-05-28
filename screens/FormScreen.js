import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView,
  StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { saveStudent } from '../database/db';

// Validation utilities
const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email);
const formatPhone = (value) => value.replace(/\D/g, '').slice(0,11)
  .replace(/(\d{2})(\d{5})(\d{4})|(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
const formatCPF = (value) => value.replace(/\D/g, '').slice(0,11)
  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  return (remainder === 10 ? 0 : remainder) === parseInt(cpf[10]);
};

export default function StudentRegistration({ navigation }) {
  // Form state
  const [studentData, setStudentData] = useState({
    firstName: '', lastName: '', idNumber: '', rg: '', birthDate: '',
    email: '', mobile: '', gender: '',
    postalCode: '', street: '', number: '', additionalInfo: '', district: '', city: '', state: '',
    photo: null
  });
  
  const [showDatePicker, setDatePickerVisibility] = useState(false);
  const [autoAddress, setAutoAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    if (field === 'postalCode' && value.length < 8) setAutoAddress(false);
    setStudentData({ ...studentData, [field]: value });
  };

  // Photo selection handler
  const selectPhoto = async () => {
    const options = [
      { 
        text: 'Tirar Foto', 
        action: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') return Alert.alert('Camera permission required');
          const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [1, 1]
          });
          if (!result.canceled) updateField('photo', result.assets[0].uri);
        }
      },
      {
        text: 'Escolha na Galeria',
        action: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') return Alert.alert('É necessário acesso à galeria');
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
            aspect: [1, 1]
          });
          if (!result.canceled) updateField('photo', result.assets[0].uri);
        }
      },
      { text: 'Cancelar', style: 'cancel' }
    ];

    Alert.alert('Foto', 'Selecione', options.map(({text, action}) => ({
      text,
      onPress: action,
      style: text === 'Cancelar' ? 'cancel' : 'default'
    })));
  };

  // Address lookup
  const fetchAddress = async (postalCode) => {
    const cleanPostalCode = postalCode.replace(/\D/g, '');
    if (cleanPostalCode.length !== 8) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cleanPostalCode}/json/`);
      
      if (data.erro) {
        Alert.alert('Código inválido', 'Verifique o código');
        setAutoAddress(false);
      } else {
        setStudentData(prev => ({
          ...prev,
          street: data.logradouro || '',
          district: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
          postalCode
        }));
        setAutoAddress(true);
      }
    } catch {
      Alert.alert('Erro de conexão', 'Falha ao buscar dados de endereço');
      setAutoAddress(false);
    } finally {
      setLoading(false);
    }
  };

  // Form submission
  const submitForm = () => {
    const requiredFields = [
      !studentData.firstName,
      !studentData.mobile,
      !studentData.city,
      !validateEmail(studentData.email),
      !validateCPF(studentData.idNumber)
    ];
    
    if (requiredFields.some(Boolean)) {
      return Alert.alert('Dados insuficientes', 'Preencha todos os campos');
    }
    
    saveStudent(studentData, () => {
      Alert.alert('Sucesso', 'Registro salvo!');
      setStudentData({
        firstName: '', lastName: '', idNumber: '', rg: '', birthDate: '',
        email: '', mobile: '', gender: '',
        postalCode: '', street: '', number: '', additionalInfo: '', district: '', city: '', state: '',
        photo: null
      });
      setAutoAddress(false);
    });
  };

  // Date selection handler
  const handleDateSelect = (_, selectedDate) => {
    setDatePickerVisibility(false);
    if (selectedDate) {
      updateField('birthDate', selectedDate.toLocaleDateString());
    }
  };

  const genderOptions = ['Masculino', 'Feminino', 'Outro(a)'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registro de Funcionário</Text>

      <TouchableOpacity onPress={selectPhoto} style={styles.photoContainer}>
        {studentData.photo ? (
          <Image source={{ uri: studentData.photo }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoText}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalhes Pessoais</Text>
        
        <TextInput 
          style={styles.inputField}
          placeholder="Nome *"
          value={studentData.firstName}
          onChangeText={v => updateField('firstName', v)}
        />
        
        <TextInput
          style={styles.inputField}
          placeholder="Sobrenome"
          value={studentData.lastName}
          onChangeText={v => updateField('lastName', v)}
        />
        
        <View style={styles.row}>
          <TextInput
            style={[styles.inputField, {flex: 1, marginRight: 10}]}
            placeholder="CPF *"
            value={formatCPF(studentData.idNumber)}
            onChangeText={v => updateField('idNumber', formatCPF(v))}
            keyboardType="numeric"
          />
          
          <TextInput
            style={[styles.inputField, {flex: 1}]}
            placeholder="RG"
            value={studentData.rg}
            onChangeText={v => updateField('rg', v)}
          />
        </View>
        
        <View style={styles.row}>
          <TextInput
            style={[styles.inputField, {flex: 1}]}
            placeholder="Data de Nascimento"
            value={studentData.birthDate}
            editable={false}
          />
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text style={styles.buttonText}>Selecione</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker 
            value={new Date()} 
            mode="date" 
            display="calendar" 
            onChange={handleDateSelect} 
          />
        )}
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informação de Contato</Text>
        
        <TextInput
          style={styles.inputField}
          placeholder="Email *"
          value={studentData.email}
          onChangeText={v => updateField('email', v.toLowerCase())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.inputField}
          placeholder="Mobile *"
          value={formatPhone(studentData.mobile)}
          onChangeText={v => updateField('mobile', formatPhone(v))}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.subheader}>Gênero</Text>
        <View style={styles.genderGroup}>
          {genderOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderOption, 
                studentData.gender === option && styles.selectedGender
              ]}
              onPress={() => updateField('gender', option)}
            >
              <Text style={[
                styles.genderLabel,
                studentData.gender === option && styles.selectedLabel
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço</Text>
        
        <View style={styles.row}>
          <TextInput
            style={[styles.inputField, {flex: 1}]}
            placeholder="CEP"
            value={studentData.postalCode}
            onChangeText={v => updateField('postalCode', v)}
            onBlur={() => fetchAddress(studentData.postalCode)}
            keyboardType="numeric"
          />
          {loading && <ActivityIndicator style={styles.loader} />}
        </View>
        
        <TextInput
          style={styles.inputField}
          placeholder="Rua"
          value={studentData.street}
          onChangeText={v => updateField('street', v)}
          editable={!autoAddress}
        />
        
        <View style={styles.row}>
          <TextInput
            style={[styles.inputField, {flex: 1, marginRight: 10}]}
            placeholder="Number"
            value={studentData.number}
            onChangeText={v => updateField('number', v)}
            keyboardType="numeric"
          />
          
          <TextInput
            style={[styles.inputField, {flex: 2}]}
            placeholder="Detalhes adicionais"
            value={studentData.additionalInfo}
            onChangeText={v => updateField('additionalInfo', v)}
          />
        </View>
        
        <TextInput
          style={styles.inputField}
          placeholder="Bairro"
          value={studentData.district}
          onChangeText={v => updateField('district', v)}
          editable={!autoAddress}
        />
        
        <View style={styles.row}>
          <TextInput
            style={[styles.inputField, {flex: 2, marginRight: 10}]}
            placeholder="Cidade"
            value={studentData.city}
            onChangeText={v => updateField('city', v)}
            editable={!autoAddress}
          />
          
          <TextInput
            style={[styles.inputField, {flex: 1}]}
            placeholder="Estado"
            value={studentData.state}
            onChangeText={v => updateField('state', v)}
            editable={!autoAddress}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.submitText}>Salvar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.5
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 20
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#3498db'
  },
  photoPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#90caf9'
  },
  photoText: {
    color: '#64b5f6',
    fontWeight: '500'
  },
  inputField: {
    backgroundColor: '#f1f8ff',
    borderWidth: 1,
    borderColor: '#bbdefb',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    color: '#37474f'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15
  },
  dateButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '500'
  },
  subheader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#37474f',
    marginBottom: 12
  },
  genderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  genderOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#bbdefb',
    backgroundColor: '#f1f8ff'
  },
  selectedGender: {
    backgroundColor: '#3498db',
    borderColor: '#3498db'
  },
  genderLabel: {
    color: '#37474f',
    fontWeight: '500'
  },
  selectedLabel: {
    color: 'white'
  },
  loader: {
    marginLeft: 10,
    alignSelf: 'center'
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  submitText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5
  }
});