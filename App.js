import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/config/toastConfig';

// Importe TODAS as suas telas
import LoginScreen from './src/screens/Auth/LoginScreen';
import UserProfileScreen from './src/screens/Shared/UserProfileScreen';
// Telas dos Pais
import ParentDashboardScreen from './src/screens/Parent/ParentDashboardScreen';
import ParentReportScreen from './src/screens/Parent/ParentReportScreen';
import AddObservationScreen from './src/screens/Parent/AddObservationScreen';
import GoalDetailsScreen from './src/screens/Parent/GoalDetailsScreen';
// Telas do Professor
import TeacherDashboardScreen from './src/screens/Teacher/TeacherDashboardScreen';
import TeacherStudentsListScreen from './src/screens/Teacher/TeacherStudentsListScreen';
import TeacherReportScreen from './src/screens/Teacher/TeacherReportScreen';
import AddActivityScreen from './src/screens/Teacher/AddActivityScreen';
import StudentDetailsScreen from './src/screens/Teacher/StudentDetailsScreen';
// Telas do Gestor
import ManagerDashboardScreen from './src/screens/Manager/ManagerDashboardScreen';
import ManagerStudentsListScreen from './src/screens/Manager/ManagerStudentsListScreen';
import ManagerReportScreen from './src/screens/Manager/ManagerReportScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- NAVEGADORES DE ABAS ---

const ParentTabs = () => (
    <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Início" component={ParentDashboardScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
        <Tab.Screen name="Relatórios" component={ParentReportScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="chart-line" color={color} size={size} />) }} />
        <Tab.Screen name="Perfil" component={UserProfileScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="user" color={color} size={size} solid />) }} />
    </Tab.Navigator>
);

const TeacherTabs = () => (
    <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Início" component={TeacherDashboardScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
        <Tab.Screen name="Alunos" component={TeacherStudentsListScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="users" color={color} size={size} />) }} />
        <Tab.Screen name="Relatórios" component={TeacherReportScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="chart-line" color={color} size={size} />) }} />
    </Tab.Navigator>
);

const ManagerTabs = () => (
    <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Painel" component={ManagerDashboardScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="columns" color={color} size={size} />) }} />
        <Tab.Screen name="Alunos" component={ManagerStudentsListScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="users" color={color} size={size} />) }} />
        <Tab.Screen name="Relatórios" component={ManagerReportScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="file-alt" color={color} size={size} />) }} />
    </Tab.Navigator>
);


// --- NAVEGADORES DE PILHA (STACKS) ---

const ParentNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ParentTabs" component={ParentTabs} />
        <Stack.Screen name="AddObservation" component={AddObservationScreen} />
        <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
    </Stack.Navigator>
);

const TeacherNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TeacherTabs" component={TeacherTabs} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen} />
        <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} />
    </Stack.Navigator>
);

const ManagerNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ManagerTabs" component={ManagerTabs} />
    </Stack.Navigator>
);


// --- COMPONENTE DE NAVEGAÇÃO PRINCIPAL ---
const AppNavigator = () => {
    const { userRole, login } = useAuth();

    if (!userRole) {
        return <LoginScreen onLogin={login} />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
            {userRole === 'parent' && <Stack.Screen name="ParentRoot" component={ParentNavigator} />}
            {userRole === 'teacher' && <Stack.Screen name="TeacherRoot" component={TeacherNavigator} />}
            {userRole === 'manager' && <Stack.Screen name="ManagerRoot" component={ManagerNavigator} />}
            {/* A tela de perfil agora é uma tela modal que pode ser chamada por cima de qualquer navegador */}
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>
    );
};

// --- COMPONENTE RAIZ DO APP ---
const App = () => (
    <AuthProvider>
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
    </AuthProvider>
);

// --- ESTILOS ---
const tabScreenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#005A8D',
    tabBarInactiveTintColor: '#94a3b8',
    tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        height: 90, // Aumentamos a altura
        paddingTop: 5, // Adicionamos um espaçamento no topo
        paddingBottom: 8, // Aumentamos o espaçamento inferior
    },
    tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: -5, // Move o texto um pouco para cima
    }
};

export default App;