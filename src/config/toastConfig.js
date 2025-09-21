import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

/*
  Este objeto define os nossos tipos de toast customizados.
  Cada chave ('mosaicoSuccess', 'mosaicoError') é um tipo de toast,
  e o valor é um componente React que renderiza a aparência dele.
*/
export const toastConfig = {
  // Toast de Sucesso customizado
  mosaicoSuccess: ({ text1, text2 }) => (
    <View style={[styles.base, styles.success]}>
      <Icon name="check-circle" size={20} color="#fff" solid style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  ),

  // Toast de Erro customizado
  mosaicoError: ({ text1, text2 }) => (
    <View style={[styles.base, styles.error]}>
      <Icon name="times-circle" size={20} color="#fff" solid style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  base: {
    width: '90%',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  success: {
    backgroundColor: '#4CAF50', // Verde
  },
  error: {
    backgroundColor: '#F44336', // Vermelho
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text2: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
});