import React, { useState } from 'react'; // Importe o useState
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar,
} from 'react-native';

// Aceite a propriedade "onLogin"
const LoginScreen = ({ onLogin }) => { 
  // Crie um estado para armazenar o valor do campo de email
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Mosaico</Text>
        </View>
        
        <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite 'responsáveis', 'professor' ou 'gestor'" // Mudei o placeholder
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email} // Conecte o valor ao estado
              onChangeText={setEmail} // Atualize o estado ao digitar
            />
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry={true}
            />
        </View>

        {/* Chame a função onLogin ao pressionar, passando o email */}
        <TouchableOpacity style={styles.button} onPress={() => onLogin(email)}>
            <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.linkText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... (os styles continuam os mesmos de antes)
// StyleSheet: Aqui ficam todos os estilos (o nosso "CSS")
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o container ocupar a tela inteira
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    paddingHorizontal: 30, // Espaçamento nas laterais
  },
  logoContainer: {
    alignItems: 'center', // Centraliza itens horizontalmente
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain', // Garante que a imagem caiba no espaço
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#005A8D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    color: '#005A8D',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});
export default LoginScreen;