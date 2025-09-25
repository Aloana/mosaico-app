import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text} from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import StudentListItem from '../../components/common/StudentListItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomLoader from '../../components/common/CustomLoader';

const mockStudents = [
    { id: '1', name: 'Lucas Souza', lastUpdate: 'Último registro: Ontem', color: '#E1F5FE', initial: 'L' },
    { id: '2', name: 'Sofia Pereira', lastUpdate: 'Último registro: 02/09', color: '#FFF3E0', initial: 'S' },
];

// --- COMPONENTES INTERNOS ---

const EmptyState = ({ message }) => (
    <View style={styles.emptyContainer}>
        <Icon name="box-open" size={40} color="#cbd5e1" />
        <Text style={styles.emptyText}>{message}</Text>
    </View>
);


// --- TELA PRINCIPAL ---

const TeacherStudentsListScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            setTimeout(() => {
                setStudents(mockStudents);
                setIsLoading(false);
            }, 1500);
        };

        fetchData();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <CustomLoader />;
        }
        if (students.length === 0) {
            return <EmptyState message="Nenhum aluno encontrado." />;
        }
        return students.map(student => (
            <StudentListItem 
                key={student.id}
                name={student.name} 
                lastUpdate={student.lastUpdate} 
                color={student.color} 
                initial={student.initial} 
                onPress={() => navigation.navigate('StudentDetails', { studentId: student.id })}
            />
        ));
    };

    return (
        <ScreenWrapper>
            <Header title="Alunos">
                <Icon name="search" size={20} color="#475569" />
            </Header>

            <ScrollView contentContainerStyle={styles.content}>
                {renderContent()}
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: { 
        padding: 20,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
    }
});

export default TeacherStudentsListScreen;