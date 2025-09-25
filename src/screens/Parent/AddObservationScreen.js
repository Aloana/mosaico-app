import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Toast from 'react-native-toast-message';

const AddObservationScreen = ({ navigation }) => {

    const handleSave = () => {
        console.log("Observação salva com sucesso!");

        Toast.show({
            type: 'mosaicoSuccess',
            text1: 'Sucesso!',
            text2: 'Sua observação foi salva.',
        });

        setTimeout(() => {
            navigation.goBack();
        }, 1000);
    };

    return (
        <ScreenWrapper barBackgroundColor="#fff">
            <Header title="Adicionar Observação" onBackPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Data da Observação</Text>
                    <TextInput style={styles.input} defaultValue="21/09/2025" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sua Observação</Text>
                    <TextInput
                        style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
                        placeholder="Descreva algo que notou em casa..."
                        multiline={true}
                    />
                </View>
                <TouchableOpacity style={styles.buttonSecondary}>
                    <Icon name="paperclip" size={16} color="#475569" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonSecondaryText}>Anexar Foto</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.footer}>
                {/* 3. CONECTE A FUNÇÃO AO BOTÃO */}
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
                    <Text style={styles.buttonPrimaryText}>SALVAR OBSERVAÇÃO</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    mainContent: { flexGrow: 1, paddingHorizontal: 20, backgroundColor: '#fff' },
    inputGroup: { marginBottom: 18 },
    label: { fontSize: 14, color: '#475569', fontWeight: '600', marginBottom: 6 },
    input: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 15, fontSize: 16 },
    buttonPrimary: { backgroundColor: '#005A8D', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
    buttonPrimaryText: { color: '#fff', fontWeight: '600', fontSize: 16 },
    buttonSecondary: { flexDirection: 'row', backgroundColor: '#f1f5f9', paddingVertical: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#cbd5e1' },
    buttonSecondaryText: { color: '#475569', fontWeight: '600', fontSize: 16 },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
});

export default AddObservationScreen;