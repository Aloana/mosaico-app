import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const AnimatedShape = ({ delay, style }) => {
    const opacity = useRef(new Animated.Value(0.1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.delay(500),
            ])
        ).start();
    }, [opacity, delay]);

    return <Animated.View style={[style, { opacity }]} />;
};

const CustomLoader = () => {
    const logoPieces = [
        // Linha 1
        { id: 1, style: [styles.rect, { top: 0, left: 25, backgroundColor: '#22d3ee' }], delay: 150 },
        { id: 2, style: [styles.rect, { top: 0, left: 50, backgroundColor: '#ec4899' }], delay: 300 },
        // Linha 2
        { id: 3, style: [styles.rect, { top: 25, left: 0, backgroundColor: '#ec4899' }], delay: 0 },
        { id: 4, style: [styles.circle, { top: 25, left: 25, backgroundColor: '#facc15' }], delay: 450 },
        { id: 5, style: [styles.rect, { top: 25, left: 50, backgroundColor: '#22d3ee' }], delay: 600 },
        { id: 6, style: [styles.circle, { top: 25, left: 75, backgroundColor: '#ec4899' }], delay: 150 },
        // Linha 3
        { id: 7, style: [styles.circle, { top: 50, left: 0, backgroundColor: '#22d3ee' }], delay: 300 },
        { id: 8, style: [styles.rect, { top: 50, left: 25, backgroundColor: '#facc15' }], delay: 600 },
        { id: 9, style: [styles.rect, { top: 50, left: 50, backgroundColor: '#ec4899' }], delay: 750 },
        { id: 10, style: [styles.rect, { top: 50, left: 75, backgroundColor: '#22d3ee' }], delay: 0 },
        // Linha 4
        { id: 11, style: [styles.rect, { top: 75, left: 25, backgroundColor: '#facc15' }], delay: 750 },
        { id: 12, style: [styles.circle, { top: 75, left: 50, backgroundColor: '#ec4899' }], delay: 450 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {logoPieces.map(piece => (
                    <AnimatedShape key={piece.id} delay={piece.delay} style={piece.style} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 100,
        height: 100,
        position: 'relative',
    },
    rect: {
        width: 24,
        height: 24,
        borderRadius: 6,
        position: 'absolute',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        position: 'absolute',
    },
});

export default CustomLoader;