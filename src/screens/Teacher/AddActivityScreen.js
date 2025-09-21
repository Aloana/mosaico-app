import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

// 1. IMPORTE O TOAST
import Toast from 'react-native-toast-message';

// --- Componentes Internos ---
const DropdownPlaceholder = ({ label, value }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{value}</Text>
            <Icon name="chevron-down" size={16} color="#475569" />
        </TouchableOpacity>
    </View>
);

const StatusButton = ({ label, active, onPress }) => (
    <TouchableOpacity 
        style={[styles.statusButton, active ? styles.statusButtonActive : {}]}
        onPress={onPress}
    >
        <Text style={[styles.statusButtonText, active ? styles.statusButtonTextActive : {}]}>{label}</Text>
    </TouchableOpacity>
);


// --- Tela Principal ---
const AddActivityScreen = ({ navigation }) => {
    const [status, setStatus] = useState('success'); 

    // 2. CRIE UMA FUNÇÃO PARA SALVAR E MOSTRAR O TOAST
    const handleSave = () => {
        console.log("Registro de atividade salvo!");

        // Mostra a notificação de sucesso com nosso estilo customizado
        Toast.show({
            type: 'mosaicoSuccess',
            text1: 'Registro Salvo!',
            text2: 'O progresso do aluno foi salvo com sucesso.',
        });

        // Navega de volta para a tela anterior
        setTimeout(() => {
            navigation.goBack();
        }, 1000);
    };

    return (
        <ScreenWrapper barBackgroundColor="#fff">
            <Header title="Registrar Progresso" onBackPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.content}>
                <DropdownPlaceholder label="Aluno" value="Lucas Souza" />
                <DropdownPlaceholder label="Habilidade Trabalhada" value="Coordenação Motora" />

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusContainer}>
                        <StatusButton label="Com Sucesso" active={status === 'success'} onPress={() => setStatus('success')} />
                        <StatusButton label="Com Ajuda" active={status === 'help'} onPress={() => setStatus('help')} />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Observações</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Descreva o comportamento..."
                        multiline={true}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                {/* 3. CONECTE A FUNÇÃO AO BOTÃO */}
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
                    <Text style={styles.buttonPrimaryText}>SALVAR REGISTRO</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

// --- Estilos ---
const styles = StyleSheet.create({
    content: { padding: 20, backgroundColor: '#fff' },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, color: '#475569', fontWeight: '600', marginBottom: 8 },
    dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f5f9', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' },
    dropdownText: { fontSize: 16, color: '#1e293b' },
    statusContainer: { flexDirection: 'row', gap: 10 },
    statusButton: { flex: 1, paddingVertical: 15, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', alignItems: 'center' },
    statusButtonActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
    statusButtonText: { color: '#475569', fontWeight: '600' },
    statusButtonTextActive: { color: '#fff' },
    textArea: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 15, fontSize: 16, height: 120, textAlignVertical: 'top' },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
    buttonPrimary: { backgroundColor: '#005A8D', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
    buttonPrimaryText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default AddActivityScreen;