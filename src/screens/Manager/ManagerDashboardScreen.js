import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/AuthContext';
import CustomLoader from '../../components/common/CustomLoader';

// --- Componentes Internos ---
const KpiCard = ({ value, label }) => (
    <View style={styles.kpiCard}><Text style={styles.kpiValue}>{value}</Text><Text style={styles.kpiLabel}>{label}</Text></View>
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

const PerformanceBar = ({ label, progress }) => (
    <View style={styles.performanceItem}><Text style={styles.performanceLabel}>{label}</Text><View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${progress}%` }]} /></View></View>
);

// --- Tela Principal ---
const ManagerDashboardScreen = ({ navigation }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => { setIsLoading(false); }, 1500);
    }, []);

    return (
        <ScreenWrapper barStyle="light-content" barBackgroundColor="#003366">
            <ProfileMenuModal visible={isMenuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
            
            <View style={styles.header}>
                <View><Text style={styles.headerTitle}>Painel de Gestão</Text><Text style={styles.headerSubtitle}>Instituto Criativo</Text></View>
                <TouchableOpacity onPress={() => setMenuVisible(true)}><Icon name="user-circle" size={26} color="#fff" solid /></TouchableOpacity>
            </View>

            {isLoading ? (
                <CustomLoader />
            ) : (
                <ScrollView style={styles.scroll} contentContainerStyle={styles.mainContent}>
                    <View style={styles.kpiGrid}>
                        <KpiCard value="150" label="Alunos Ativos" /><KpiCard value="85%" label="Metas Atingidas" />
                        <KpiCard value="92%" label="Pais Engajados" /><KpiCard value="12" label="Registros/Dia" />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}><Icon name="chart-pie" size={16} color="#005A8D" /> Desempenho Geral</Text>
                        <PerformanceBar label="Comunicação" progress={85} /><PerformanceBar label="Socialização" progress={70} /><PerformanceBar label="Coord. Motora" progress={65} />
                    </View>
                    <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('Relatórios')}><Text style={styles.reportButtonText}>Gerar Relatório Institucional</Text></TouchableOpacity>
                </ScrollView>
            )}
        </ScreenWrapper>
    );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
    scroll: { backgroundColor: '#f1f5f9' },
    mainContent: { padding: 20, flexGrow: 1 },
    header: { backgroundColor: '#003366', paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { color: '#fff', fontSize: 24, fontWeight: '700' },
    headerSubtitle: { color: '#e2e8f0', fontSize: 16, marginTop: 4 },
    kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    kpiCard: { backgroundColor: '#fff', borderRadius: 10, padding: 15, alignItems: 'center', width: '48%', marginBottom: 15, elevation: 2 },
    kpiValue: { fontSize: 28, fontWeight: '700', color: '#005A8D' },
    kpiLabel: { fontSize: 13, color: '#475569', marginTop: 5 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, elevation: 2 },
    cardTitle: { fontWeight: '600', marginBottom: 15, fontSize: 16, color: '#334155' },
    performanceItem: { marginBottom: 12 },
    performanceLabel: { color: '#475569', fontSize: 14, marginBottom: 6 },
    progressBarBg: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4 },
    progressBarFill: { height: '100%', backgroundColor: '#2196F3', borderRadius: 4 },
    reportButton: { backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 15, alignItems: 'center', elevation: 2 },
    reportButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    menuCard: { backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: Platform.OS === 'ios' ? 110 : 70, right: 20, width: 200, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    menuText: { marginLeft: 15, fontSize: 16, color: '#334155' },
});

export default ManagerDashboardScreen;