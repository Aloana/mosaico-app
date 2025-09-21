import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StudentListItem = ({ name, lastUpdate, color, initial, onPress }) => (
    <TouchableOpacity style={styles.studentItem} onPress={onPress}>
        <View style={[styles.profilePic, { backgroundColor: color }]}>
            <Text style={styles.profilePicText}>{initial}</Text>
        </View>
        <View>
            <Text style={styles.studentName}>{name}</Text>
            <Text style={styles.studentUpdate}>{lastUpdate}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profilePicText: {
        color: '#003366',
        fontSize: 20,
        fontWeight: 'bold',
    },
    studentName: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    studentUpdate: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 2,
    },
});

export default StudentListItem;