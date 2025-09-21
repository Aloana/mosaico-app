import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import StudentListItem from '../../components/common/StudentListItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TEACHER_FILTERS, CLASS_FILTERS } from '../../constants/filterOptions';
import CustomLoader from '../../components/common/CustomLoader';

// Dados de exemplo
const mockStudents = [
    { id: '1', name: 'Lucas Souza', lastUpdate: 'Último registro: Ontem', color: '#E1F5FE', initial: 'L' },
    { id: '2', name: 'Sofia Pereira', lastUpdate: 'Último registro: 02/09', color: '#FFF3E0', initial: 'S' },
];

// --- Componentes Internos ---

const EmptyState = ({ message }) => (
    <View style={styles.emptyContainer}>
        <Icon name="box-open" size={40} color="#cbd5e1" />
        <Text style={styles.emptyText}>{message}</Text>
    </View>
);

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

// --- TELA PRINCIPAL ---

const ManagerStudentsListScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [teacher, setTeacher] = useState('all');
    const [classGroup, setClassGroup] = useState('all');
    const [isTeacherModalVisible, setTeacherModalVisible] = useState(false);
    const [isClassModalVisible, setClassModalVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStudents(mockStudents);
            setIsLoading(false);
        }, 1500);
    }, []);

    const getLabel = (options, value) => options.find(opt => opt.value === value)?.label || '';

    const renderContent = () => {
        if (isLoading) { return <CustomLoader />; }
        if (students.length === 0) { return <EmptyState message="Nenhum aluno encontrado." />; }
        return students.map(student => (
            <StudentListItem 
                key={student.id}
                name={student.name} 
                lastUpdate={student.lastUpdate} 
                color={student.color} 
                initial={student.initial} 
                onPress={() => { /* Navegaria para detalhes do aluno */ }}
            />
        ));
    };

    return (
        <ScreenWrapper>
            <Header title="Alunos">
                <Icon name="search" size={20} color="#475569" />
            </Header>

            <FilterSelectionModal visible={isTeacherModalVisible} onClose={() => setTeacherModalVisible(false)} options={TEACHER_FILTERS} selectedValue={teacher} onSelect={setTeacher} title="Selecionar Professor(a)" />
            <FilterSelectionModal visible={isClassModalVisible} onClose={() => setClassModalVisible(false)} options={CLASS_FILTERS} selectedValue={classGroup} onSelect={setClassGroup} title="Selecionar Turma" />

            <View style={styles.filtersContainer}>
                <TouchableOpacity style={styles.filterButton} onPress={() => setTeacherModalVisible(true)}>
                    <Text style={styles.filterText}>{getLabel(TEACHER_FILTERS, teacher)}</Text>
                    <Icon name="chevron-down" size={12} color="#334155" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setClassModalVisible(true)}>
                    <Text style={styles.filterText}>{getLabel(CLASS_FILTERS, classGroup)}</Text>
                    <Icon name="chevron-down" size={12} color="#334155" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {renderContent()}
            </ScrollView>
        </ScreenWrapper>
    );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
    content: { paddingHorizontal: 20, paddingTop: 10, flexGrow: 1 },
    filtersContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20, gap: 10, backgroundColor: '#f8f9fa', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    filterButton: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
    filterText: { color: '#334155', fontWeight: '500' },
    modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
    selectionModalContent: { backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: 130, left: 20, right: 20, padding: 10, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e2d3b', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', marginBottom: 5 },
    filterOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
    filterOptionText: { fontSize: 16, color: '#334155' },
    filterOptionTextSelected: { fontWeight: 'bold', color: '#005A8D' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { marginTop: 15, fontSize: 16, color: '#94a3b8', textAlign: 'center' },
});

export default ManagerStudentsListScreen;