import React, { useState, useEffect } from 'react';
// 1. IMPORTAÇÕES ADICIONAIS
import { ScrollView, StyleSheet, View, Text} from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import StudentListItem from '../../components/common/StudentListItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomLoader from '../../components/common/CustomLoader';

// Dados de exemplo que simulariam uma resposta da API
const mockStudents = [
    { id: '1', name: 'Lucas Souza', lastUpdate: 'Último registro: Ontem', color: '#E1F5FE', initial: 'L' },
    { id: '2', name: 'Sofia Pereira', lastUpdate: 'Último registro: 02/09', color: '#FFF3E0', initial: 'S' },
];

// --- COMPONENTES INTERNOS ---

// 2. NOVO COMPONENTE DE ESTADO VAZIO
const EmptyState = ({ message }) => (
    <View style={styles.emptyContainer}>
        <Icon name="box-open" size={40} color="#cbd5e1" />
        <Text style={styles.emptyText}>{message}</Text>
    </View>
);


// --- TELA PRINCIPAL ---

const TeacherStudentsListScreen = ({ navigation }) => {
    // 3. ESTADO PARA CARREGAMENTO E DADOS
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);

    // 4. SIMULAÇÃO DE BUSCA DE DADOS
    useEffect(() => {
        // Simula uma chamada de rede que demora 1.5 segundos
        const fetchData = () => {
            setTimeout(() => {
                setStudents(mockStudents); // Carrega os dados de exemplo
                setIsLoading(false);      // Para de carregar
            }, 1500);
        };

        fetchData();
    }, []); // O array vazio [] garante que isso só rode uma vez

    // Função para renderizar o conteúdo principal da tela
    const renderContent = () => {
        // Se estiver carregando, mostra o indicador
        if (isLoading) {
            // 3. SUBSTITUA o ActivityIndicator pelo CustomLoader
            return <CustomLoader />;
        }
        // Se não estiver carregando E a lista de alunos estiver vazia, mostra o estado vazio
        if (students.length === 0) {
            return <EmptyState message="Nenhum aluno encontrado." />;
        }
        // Se tiver alunos, mostra a lista
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

            {/* O conteúdo da ScrollView agora é renderizado pela nossa função */}
            <ScrollView contentContainerStyle={styles.content}>
                {renderContent()}
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: { 
        padding: 20,
        flexGrow: 1, // Importante para o loader/empty state centralizar
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