import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TIME_RANGE_FILTERS, CLASS_FILTERS } from '../../constants/filterOptions';

const FilterSelectionModal = ({ visible, onClose, options, selectedValue, onSelect, title }) => (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
            <View style={styles.selectionModalContent}>
                <Text style={styles.modalTitle}>{title}</Text>
                {options.map((option) => (
                    <TouchableOpacity 
                        key={option.value} 
                        style={styles.filterOption}
                        onPress={() => { onSelect(option.value); onClose(); }}
                    >
                        <Text style={[styles.filterOptionText, selectedValue === option.value && styles.filterOptionTextSelected]}>
                            {option.label}
                        </Text>
                        {selectedValue === option.value && <Icon name="check" size={16} color="#005A8D" />}
                    </TouchableOpacity>
                ))}
            </View>
        </TouchableOpacity>
    </Modal>
);

const ChartBar = ({ label, percentage }) => (
    <View style={styles.barWrapper}><View style={[styles.chartBar, { height: `${percentage}%` }]} /><Text style={styles.barLabel}>{label}</Text></View>
);

const ManagerReportScreen = ({ navigation }) => {
    const [period, setPeriod] = useState('last_30_days');
    const [classGroup, setClassGroup] = useState('all');
    const [isPeriodModalVisible, setPeriodModalVisible] = useState(false);
    const [isClassModalVisible, setClassModalVisible] = useState(false);

    const getLabel = (options, value) => options.find(opt => opt.value === value)?.label || '';

    return (
        <ScreenWrapper barBackgroundColor="#fff">
            <Header title="Relatório Institucional" onBackPress={() => navigation.goBack()}>
                <TouchableOpacity>
                    <Icon name="download" size={20} color="#475569" />
                </TouchableOpacity>
            </Header>

            <FilterSelectionModal visible={isPeriodModalVisible} onClose={() => setPeriodModalVisible(false)} options={TIME_RANGE_FILTERS} selectedValue={period} onSelect={setPeriod} title="Selecionar Período" />
            <FilterSelectionModal visible={isClassModalVisible} onClose={() => setClassModalVisible(false)} options={CLASS_FILTERS} selectedValue={classGroup} onSelect={setClassGroup} title="Selecionar Turma" />
            
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.filtersContainer}>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setPeriodModalVisible(true)}>
                        <Text style={styles.filterText}>{getLabel(TIME_RANGE_FILTERS, period)}</Text>
                        <Icon name="chevron-down" size={12} color="#334155" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setClassModalVisible(true)}>
                        <Text style={styles.filterText}>{getLabel(CLASS_FILTERS, classGroup)}</Text>
                        <Icon name="chevron-down" size={12} color="#334155" />
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}><Icon name="check-circle" color="#4CAF50" solid /> Conclusão de Atividades</Text>
                    <View style={styles.chartContainer}>
                        <ChartBar label="Sem 1" percentage={85} />
                        <ChartBar label="Sem 2" percentage={60} />
                        <ChartBar label="Sem 3" percentage={95} />
                        <ChartBar label="Sem 4" percentage={70} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}><Icon name="users" color="#FF9800" /> Engajamento Familiar</Text>
                    <Text style={styles.cardContent}>Total de <Text style={{fontWeight: 'bold'}}>138 pais</Text> ativos na plataforma, com <Text style={{fontWeight: 'bold'}}>450 observações</Text> adicionadas no período.</Text>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: { padding: 20, backgroundColor: '#fff' },
    filtersContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 10 },
    filterButton: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
    filterText: { color: '#334155', fontWeight: '500' },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#334155', marginBottom: 15 },
    cardContent: { fontSize: 14, color: '#64748b', lineHeight: 22 },
    chartContainer: { height: 140, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
    barWrapper: { flex: 1, alignItems: 'center' },
    chartBar: { width: '40%', backgroundColor: '#4CAF50', borderRadius: 5 },
    barLabel: { fontSize: 11, color: '#64748b', marginTop: 8 },
    modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
    selectionModalContent: { backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: 130, left: 20, right: 20, padding: 10, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', marginBottom: 5 },
    filterOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
    filterOptionText: { fontSize: 16, color: '#334155' },
    filterOptionTextSelected: { fontWeight: 'bold', color: '#005A8D' },
});

export default ManagerReportScreen;