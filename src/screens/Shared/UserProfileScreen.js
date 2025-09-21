import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../constants/userData';

// Componente para cada linha de opção
const ProfileOption = ({ icon, label, hasSwitch, onValueChange, switchValue }) => (
    <View style={styles.optionRow}>
        <View style={styles.optionLeft}>
            <Icon name={icon} size={20} color="#475569" style={styles.optionIcon} />
            <Text style={styles.optionLabel}>{label}</Text>
        </View>
        {hasSwitch ? (
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={switchValue ? '#005A8D' : '#f4f3f4'}
                onValueChange={onValueChange}
                value={switchValue}
            />
        ) : (
            <Icon name="chevron-right" size={16} color="#94a3b8" />
        )}
    </View>
);

// --- TELA PRINCIPAL ---
const UserProfileScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(false);

    const { userRole } = useAuth(); // Pega o perfil do usuário logado
    const userData = MOCK_USERS[userRole] || {}; // Pega os dados do usuário com base no perfil

    return (
        <ScreenWrapper barBackgroundColor="#f1f5f9">
            <Header title="Meu Perfil" onBackPress={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profilePic}>
                        <Text style={styles.profilePicText}>{userData.initial}</Text>
                    </View>
                    <Text style={styles.profileName}>{userData.name}</Text>
                    <Text style={styles.profileEmail}>{userData.email}</Text>
                </View>

                <Text style={styles.sectionTitle}>Notificações</Text>
                <View style={styles.card}>
                    <ProfileOption 
                        icon="bell" 
                        label="Notificações do App" 
                        hasSwitch 
                        switchValue={notifications}
                        onValueChange={() => setNotifications(previousState => !previousState)}
                    />
                    <ProfileOption 
                        icon="envelope" 
                        label="Alertas por E-mail" 
                        hasSwitch 
                        switchValue={emailAlerts}
                        onValueChange={() => setEmailAlerts(previousState => !previousState)}
                    />
                </View>

                <Text style={styles.sectionTitle}>Conta</Text>
                <View style={styles.card}>
                    <TouchableOpacity><ProfileOption icon="key" label="Alterar Senha" /></TouchableOpacity>
                    <TouchableOpacity><ProfileOption icon="info-circle" label="Sobre o App" /></TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

// Cole os estilos do ParentProfileScreen.js aqui, eles são idênticos
const styles = StyleSheet.create({
    content: { padding: 20 },
    profileInfoContainer: { alignItems: 'center', marginBottom: 30 },
    profilePic: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    profilePicText: { color: '#003366', fontSize: 32, fontWeight: 'bold' },
    profileName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
    profileEmail: { fontSize: 16, color: '#64748b', marginTop: 4 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#475569', marginBottom: 10 },
    card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 20 },
    optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    optionLeft: { flexDirection: 'row', alignItems: 'center' },
    optionIcon: { width: 25 },
    optionLabel: { fontSize: 16, color: '#334155', marginLeft: 15 },
});

export default UserProfileScreen;