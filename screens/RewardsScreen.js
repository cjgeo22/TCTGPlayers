import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { GlobalStyles } from "../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';

const RewardsScreen = () => {
    return (
        <LinearGradient 
        colors={[GlobalStyles.colors.primary800, GlobalStyles.colors.accent500]}
        style={styles.container}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Scan me!</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/fulpnumQR.png')} />
            </View>
        </View>
        </LinearGradient>
    );
};

export default RewardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent", // "transparent
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        fontFamily: 'bbnr',
        color: 'white',
        margin: 50,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 120,
    },
    image: {
        width: 350,
        height: 350,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
});