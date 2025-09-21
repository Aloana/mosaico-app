import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomLoader from '../../components/common/CustomLoader';
import { TIME_RANGE_FILTERS, ACTIVITY_STATUS_FILTERS, SKILL_AREA_FILTERS, RECORD_SOURCE_FILTERS } from '../../constants/filterOptions';

// --- COMPONENTES INTERNOS ---

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

const AdvancedFilterModal = ({ visible, onClose }) => {
    const [selectedSkill, setSelectedSkill] = useState('all');
    const [selectedSource, setSelectedSource] = useState('all');
    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
                <View style={styles.advancedModalContent}>
                    <View style={styles.modalHeader}><Text style={styles.modalTitle}>Filtros Avançados</Text><TouchableOpacity onPress={onClose}><Icon name="times" size={22} color="#64748b" /></TouchableOpacity></View>
                    <ScrollView>
                        <Text style={styles.sectionTitle}>Por Área de Habilidade</Text>
                        {SKILL_AREA_FILTERS.map((filter) => (<TouchableOpacity key={filter.value} style={styles.filterOption} onPress={() => setSelectedSkill(filter.value)}><Icon name={selectedSkill === filter.value ? 'check-circle' : 'circle'} solid size={20} color={selectedSkill === filter.value ? '#005A8D' : '#cbd5e1'} /><Text style={styles.filterOptionText}>{filter.label}</Text></TouchableOpacity>))}
                        <Text style={styles.sectionTitle}>Por Origem do Registro</Text>
                        {RECORD_SOURCE_FILTERS.map((filter) => (<TouchableOpacity key={filter.value} style={styles.filterOption} onPress={() => setSelectedSource(filter.value)}><Icon name={selectedSource === filter.value ? 'check-circle' : 'circle'} solid size={20} color={selectedSource === filter.value ? '#005A8D' : '#cbd5e1'} /><Text style={styles.filterOptionText}>{filter.label}</Text></TouchableOpacity>))}
                    </ScrollView>
                    <View style={styles.modalFooter}><TouchableOpacity style={styles.clearButton}><Text style={styles.clearButtonText}>Limpar</Text></TouchableOpacity><TouchableOpacity style={styles.applyButton} onPress={onClose}><Text style={styles.applyButtonText}>Aplicar Filtros</Text></TouchableOpacity></View>
                </View>
            </View>
        </Modal>
    );
};

const ChartBar = ({ label, percentage }) => (
    <View style={styles.barWrapper}><View style={[styles.chartBar, { height: `${percentage}%` }]} /><Text style={styles.barLabel}>{label}</Text></View>
);

// --- TELA PRINCIPAL ---
const ParentReportScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [period, setPeriod] = useState('last_30_days');
    const [activityType, setActivityType] = useState('all');
    const [isPeriodModalVisible, setPeriodModalVisible] = useState(false);
    const [isActivityModalVisible, setActivityModalVisible] = useState(false);
    const [isAdvancedModalVisible, setAdvancedModalVisible] = useState(false);
    
    useEffect(() => {
        setTimeout(() => { setIsLoading(false); }, 2000);
    }, []);
    
    const getLabel = (options, value) => options.find(opt => opt.value === value)?.label || '';

    return (
        <ScreenWrapper barBackgroundColor="#fff">
            <Header title="Relatório" onBackPress={() => navigation.goBack()}>
                <TouchableOpacity onPress={() => setAdvancedModalVisible(true)}>
                    <Icon name="sliders-h" size={20} color="#475569" />
                </TouchableOpacity>
            </Header>

            <AdvancedFilterModal visible={isAdvancedModalVisible} onClose={() => setAdvancedModalVisible(false)} />
            <FilterSelectionModal visible={isPeriodModalVisible} onClose={() => setPeriodModalVisible(false)} options={TIME_RANGE_FILTERS} selectedValue={period} onSelect={setPeriod} title="Selecionar Período" />
            <FilterSelectionModal visible={isActivityModalVisible} onClose={() => setActivityModalVisible(false)} options={ACTIVITY_STATUS_FILTERS} selectedValue={activityType} onSelect={setActivityType} title="Selecionar Tipo de Atividade" />

            {isLoading ? (
                <CustomLoader />
            ) : (
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.filtersContainer}>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setPeriodModalVisible(true)}><Text style={styles.filterText}>{getLabel(TIME_RANGE_FILTERS, period)}</Text><Icon name="chevron-down" size={12} color="#334155" /></TouchableOpacity>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setActivityModalVisible(true)}><Text style={styles.filterText}>{getLabel(ACTIVITY_STATUS_FILTERS, activityType)}</Text><Icon name="chevron-down" size={12} color="#334155" /></TouchableOpacity>
                    </View>
                    <View style={styles.card}><Text style={styles.cardTitle}><Icon name="check-circle" color="#4CAF50" solid /> Conclusão de Atividades</Text><View style={styles.chartContainer}><ChartBar label="Sem 1" percentage={85} /><ChartBar label="Sem 2" percentage={60} /><ChartBar label="Sem 3" percentage={95} /><ChartBar label="Sem 4" percentage={70} /></View></View>
                    <Text style={styles.sectionTitle}>Metas</Text>
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('GoalDetails')}><Text style={styles.cardTitle}><Icon name="bullseye" color="#005A8D" /> Aumentar a participação em grupo</Text><Text style={styles.cardContent}>Acompanhe as atividades que contribuem para esta meta.</Text></TouchableOpacity>
                </ScrollView>
            )}
        </ScreenWrapper>
    );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
    content: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
    filtersContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 10 },
    filterButton: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
    filterText: { color: '#334155', fontWeight: '500' },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#334155', marginBottom: 15 },
    cardContent: { fontSize: 14, color: '#64748b' },
    chartContainer: { height: 140, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
    barWrapper: { flex: 1, alignItems: 'center' },
    chartBar: { width: '40%', backgroundColor: '#4CAF50', borderRadius: 5 },
    barLabel: { fontSize: 11, color: '#64748b', marginTop: 8 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e2d3b', marginBottom: 10, marginTop: 15 },
    modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
    selectionModalContent: { backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: 130, left: 20, right: 20, padding: 10, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e2d3b', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', marginBottom: 5 },
    filterOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10 },
    filterOptionText: { fontSize: 16, color: '#334155', marginLeft: 12 },
    filterOptionTextSelected: { fontWeight: 'bold', color: '#005A8D' },
    modalContainer: { flex: 1, justifyContent: 'flex-end' },
    advancedModalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, height: '60%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 15, marginBottom: 15 },
    modalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
    clearButton: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' },
    clearButtonText: { color: '#475569', fontWeight: 'bold' },
    applyButton: { backgroundColor: '#005A8D', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8 },
    applyButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ParentReportScreen;