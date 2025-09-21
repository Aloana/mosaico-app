import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProgressBar = ({ progress }) => (
    <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${progress}%` }]} /></View>
);

const TimelineItem = ({ icon, iconBg, title, source, description }) => (
    <View style={styles.timelineItem}>
        <View style={[styles.timelineIconContainer, { backgroundColor: iconBg }]}>
            <Icon name={icon} size={16} color="#4338ca" />
        </View>
        <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>{title}</Text>
            <Text style={styles.timelineSource}>{source}</Text>
            <Text style={styles.timelineDescription}>{description}</Text>
        </View>
    </View>
);

const GoalDetailsScreen = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <Header title="Detalhes da Meta" onBackPress={() => navigation.goBack()}>
                <Icon name="sliders-h" size={20} color="#475569" />
            </Header>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        <Icon name="bullseye" color="#005A8D" /> Aumentar a participação em grupo
                    </Text>
                    <Text style={styles.cardContent}>
                        Acompanhe as atividades que contribuem para esta meta.
                    </Text>
                    <ProgressBar progress={70} />
                </View>

                <Text style={styles.sectionTitle}>Histórico Relacionado</Text>

                <TimelineItem
                    icon="user-graduate"
                    iconBg="#dcfce7"
                    title="Atividade de Pintura em Grupo"
                    source="Registado por Prof. Carlos - 07/09"
                    description="Lucas interagiu com Sofia para partilhar o giz de cera azul."
                />
                <TimelineItem
                    icon="house-user"
                    iconBg="#e0e7ff"
                    title="Festa de aniversário do primo"
                    source="Observado por Ana (Mãe) - 05/09"
                    description="Brincou com outras duas crianças durante a festa, mostrando-se mais à vontade."
                />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: { padding: 20 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: '#e2e8f0' },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#334155', marginBottom: 8 },
    cardContent: { fontSize: 14, color: '#64748b', marginBottom: 15 },
    progressBarBg: { height: 10, backgroundColor: '#e2e8f0', borderRadius: 5 },
    progressBarFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
    timelineItem: { flexDirection: 'row', marginBottom: 20 },
    timelineIconContainer: { width: 35, height: 35, borderRadius: 17.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    timelineContent: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 20 },
    timelineTitle: { fontWeight: '600', color: '#334155' },
    timelineSource: { fontSize: 12, color: '#64748b', marginVertical: 4 },
    timelineDescription: { fontSize: 14, color: '#475569' },
});

export default GoalDetailsScreen;