import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Caminhos corrigidos para refletir a estrutura de pastas
import LoginScreen from '../screens/Auth/LoginScreen';
import ParentDashboard from '../screens/Parent/ParentDashboard';
import TeacherDashboard from '../screens/Teacher/TeacherDashboard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        {/* Adicione as outras telas aqui no futuro */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

