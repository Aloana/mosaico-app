import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Fab from '../../components/common/Fab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/AuthContext';
import CustomLoader from '../../components/common/CustomLoader';

// --- COMPONENTES INTERNOS ---

const ProfileHeader = ({ onPress }) => (
    <TouchableOpacity style={styles.profileHeaderContainer} onPress={onPress}>
        <View style={styles.profilePic}><Text style={styles.profilePicText}>A</Text></View>
        <View>
            <Text style={styles.welcomeText}>Bem-vinda, Ana</Text>
            <Text style={styles.studentName}>Painel de Alunos</Text>
        </View>
    </TouchableOpacity>
);

const KpiCard = ({ value, label }) => (
    <View style={styles.kpiCard}>
        <Text style={styles.kpiValue}>{value}</Text>
        <Text style={styles.kpiLabel}>{label}</Text>
    </View>
);

const ProgressBar = ({ progress }) => (
    <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${progress}%` }]} /></View>
);

const ProfileMenuModal = ({ visible, onClose, navigation }) => {
    const { logout } = useAuth();
    const goToProfile = () => {
        onClose();
        navigation.navigate('UserProfile');
    };
    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.menuCard}>
                    <TouchableOpacity style={styles.menuItem} onPress={goToProfile}><Icon name="user-circle" size={16} color="#334155" /><Text style={styles.menuText}>Meu Perfil</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}><Icon name="headset" size={16} color="#334155" /><Text style={styles.menuText}>Suporte</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={logout}><Icon name="sign-out-alt" size={16} color="#c53929" /><Text style={[styles.menuText, { color: '#c53929' }]}>Sair</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

// --- TELA PRINCIPAL ---

const TeacherDashboardScreen = () => {
    const navigation = useNavigation();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => { setIsLoading(false); }, 1500);
    }, []);

    return (
        <ScreenWrapper barBackgroundColor="#f1f5f9">
            <ProfileMenuModal visible={isMenuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />

            <View style={styles.header}>
                <ProfileHeader onPress={() => setMenuVisible(true)} />
                <Icon name="bell" size={22} color="#475569" solid />
            </View>

            {isLoading ? (
                <CustomLoader />
            ) : (
                <ScrollView contentContainerStyle={styles.mainContent}>
                    <View style={styles.kpiGrid}>
                        <KpiCard value="23" label="Alunos Ativos" />
                        <KpiCard value="92%" label="Metas Atingidas" />
                        <KpiCard value="94%" label="Pais Engajados" />
                        <KpiCard value="21" label="Registos/Dia" />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}><Icon name="bullseye" color="#4CAF50" size={14} /> Meta Atual</Text>
                        <Text style={styles.cardContent}>Chegar a 95% das Metas Atingidas</Text>
                        <ProgressBar progress={92} />
                    </View>
                </ScrollView>
            )}

            <Fab onPress={() => navigation.navigate('AddActivity')} />
        </ScreenWrapper>
    );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    profileHeaderContainer: { flexDirection: 'row', alignItems: 'center' },
    profilePic: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    profilePicText: { color: '#003366', fontSize: 18, fontWeight: 'bold' },
    welcomeText: { color: '#475569', fontSize: 14 },
    studentName: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
    mainContent: { paddingHorizontal: 20, paddingBottom: 20, flexGrow: 1 },
    kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    kpiCard: { backgroundColor: '#fff', borderRadius: 16, padding: 15, alignItems: 'center', width: '48%', marginBottom: 15, elevation: 3, shadowColor: '#999', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
    kpiValue: { fontSize: 24, fontWeight: 'bold', color: '#005A8D' },
    kpiLabel: { fontSize: 13, color: '#475569', marginTop: 5 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 15, elevation: 3, shadowColor: '#999', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
    cardTitle: { fontWeight: '600', marginBottom: 10, fontSize: 16, color: '#334155' },
    cardContent: { fontSize: 14, color: '#475569', lineHeight: 20 },
    progressBarBg: { height: 10, backgroundColor: '#e2e8f0', borderRadius: 5, marginTop: 10 },
    progressBarFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 5 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    menuCard: { backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: Platform.OS === 'ios' ? 100 : 60, left: 20, width: 200, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    menuText: { marginLeft: 15, fontSize: 16, color: '#334155' },
});

export default TeacherDashboardScreen;