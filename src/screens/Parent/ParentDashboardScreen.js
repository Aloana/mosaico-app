import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ScreenWrapper from '../../components/common/ScreenWrapper';
import Fab from '../../components/common/Fab';
import { useAuth } from '../../context/AuthContext';
import CustomLoader from '../../components/common/CustomLoader';

// --- Componentes Internos ---

const ProfileHeader = ({ onPress }) => (
    <TouchableOpacity style={styles.profileHeaderContainer} onPress={onPress}>
        <View style={styles.profilePic}><Text style={styles.profilePicText}>A</Text></View>
        <View>
            <Text style={styles.welcomeText}>Bem-vinda, Ana</Text>
            <Text style={styles.studentName}>Painel de Lucas</Text>
        </View>
    </TouchableOpacity>
);

const Card = ({ icon, iconColor, title, children }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>
            <Icon name={icon} color={iconColor} size={14} /> {title}
        </Text>
        <Text style={styles.cardContent}>{children}</Text>
    </View>
);

const ProgressBar = ({ progress }) => (
    <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${progress}%` }]} /></View>
);

const ProfileMenuModal = ({ visible, onClose, navigation }) => {
    const { logout } = useAuth();
    const goToProfile = () => {
        onClose();
        navigation.navigate('Perfil');
    };
    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.menuCard}>
                    <TouchableOpacity style={styles.menuItem} onPress={goToProfile}>
                        <Icon name="user-circle" size={16} color="#334155" />
                        <Text style={styles.menuText}>Meu Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="headset" size={16} color="#334155" />
                        <Text style={styles.menuText}>Suporte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={logout}>
                        <Icon name="sign-out-alt" size={16} color="#c53929" />
                        <Text style={[styles.menuText, { color: '#c53929' }]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

// --- Tela Principal ---

const ParentDashboardScreen = () => {
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
                    <Card icon="trophy" iconColor="#FFC107" title="Conquistas da Semana">
                        • Montou um quebra-cabeça de 10 peças.
                    </Card>
                    <Card icon="search" iconColor="#F44336" title="Pontos de Atenção">
                        • Dificuldade na atividade de recorte.
                    </Card>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}><Icon name="bullseye" color="#4CAF50" size={14} /> Meta Atual</Text>
                        <Text style={styles.cardContent}>Aumentar a participação em grupo</Text>
                        <ProgressBar progress={70} />
                    </View>
                </ScrollView>
            )}

            <Fab onPress={() => navigation.navigate('AddObservation')} />
        </ScreenWrapper>
    );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    profileHeaderContainer: { flexDirection: 'row', alignItems: 'center' },
    profilePic: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    profilePicText: { color: '#003366', fontSize: 20, fontWeight: 'bold' },
    welcomeText: { color: '#475569', fontSize: 16 },
    studentName: { fontSize: 20, fontWeight: 'bold', color: '#1e2b3b' },
    mainContent: { paddingHorizontal: 20, paddingBottom: 20, flexGrow: 1 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 },
    cardTitle: { fontWeight: '600', marginBottom: 10, fontSize: 16, color: '#334155' },
    cardContent: { fontSize: 14, color: '#475569', lineHeight: 20 },
    progressBarBg: { height: 10, backgroundColor: '#e2e8f0', borderRadius: 5, marginTop: 10 },
    progressBarFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 5 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    menuCard: { backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: Platform.OS === 'ios' ? 110 : 70, left: 20, width: 200, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    menuText: { marginLeft: 15, fontSize: 16, color: '#334155' },
});

export default ParentDashboardScreen;