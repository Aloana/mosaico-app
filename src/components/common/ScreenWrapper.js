import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';

const ScreenWrapper = ({ children, style, barStyle = 'dark-content', barBackgroundColor = '#f1f5f9' }) => {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: barBackgroundColor }, style]}>
            <StatusBar barStyle={barStyle} backgroundColor="rgba(0,0,0,0)" translucent={true} />
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});

export default ScreenWrapper;