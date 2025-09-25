import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Card = ({ icon, iconColor, title, children }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>
            <Icon name={icon} color={iconColor} size={14} /> {title}
        </Text>
        <Text style={styles.cardContent}>{children}</Text>
    </View>
);

const StudentDetailsScreen = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <Header title="Painel de Lucas" onBackPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.mainContent}>
                <Card icon="trophy" iconColor="#FFC107" title="Conquistas Recentes">
                    • Montou um quebra-cabeça de 10 peças.
                </Card>
                <Card icon="bullseye" iconColor="#4CAF50" title="Meta Ativa">
                    Aumentar a participação em grupo
                </Card>
            </ScrollView>
            <TouchableOpacity style={styles.fab}>
                <Icon name="plus" size={24} color="#FFF" />
            </TouchableOpacity>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    mainContent: { paddingHorizontal: 20, paddingBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 },
    cardTitle: { fontWeight: '600', marginBottom: 10, fontSize: 16, color: '#334155' },
    cardContent: { fontSize: 14, color: '#475569', lineHeight: 20 },
    fab: { position: 'absolute', bottom: 90, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#005A8D', justifyContent: 'center', alignItems: 'center', elevation: 8, zIndex: 10 },
});

export default StudentDetailsScreen;