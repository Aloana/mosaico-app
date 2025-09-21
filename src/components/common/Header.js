import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({ title, onBackPress, children }) => {
    return (
        <View style={styles.header}>
            {onBackPress && (
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#475569" />
                </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.rightSide}>
                {children ? children : <View style={{width: 20}} /> /* Espaçador */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
    },
    backButton: {
        marginRight: 10,
    },
    rightSide: {
        minWidth: 20,
    }
});

export default Header;