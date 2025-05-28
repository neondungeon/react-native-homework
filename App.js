import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your Login screen
import Login from './screens/Login';
import FormScreen from './screens/FormScreen';
import ListScreen from './screens/ListScreen';
import VisualizarAlunoScreen from './screens/VisualizarAlunoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('userToken').then(token => {
      setUserToken(token);
    });
  }, []);

  return (
    <NavigationContainer>
      {userToken == null ? (
        // No token → show Login
        <Login />
      ) : (
        // Token present → show main tab navigator
        <Tab.Navigator
          initialRouteName="Informações Pessoais"
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: '#0055FF',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name="Informações Pessoais"
            component={FormScreen}
          />
          <Tab.Screen
            name="Lista de Alunos"
            component={ListScreen}
          />
          <Tab.Screen
            name="VisualizarAluno"
            component={VisualizarAlunoScreen}
            options={{
              tabBarButton: () => null,
              headerTitle: 'Detalhes do Aluno',
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
