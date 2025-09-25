import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * Componente Floating Action Button (FAB) reutilizável.
 * @param {object} props
 * @param {function} props.onPress - A função a ser executada quando o botão for pressionado.
 */
const Fab = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Icon name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#005A8D',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 10,
    },
});

export default Fab;