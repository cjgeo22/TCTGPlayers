import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { GlobalStyles } from '../constants/styles';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
    return (
        <FlatList style={{backgroundColor: GlobalStyles.colors.primary100}}
            data={[
                { key: 'logoContainer', component: (
                    <View style={styles.logoContainer}>
                        <Text style={styles.heading}>Welcome back, Dakota!</Text>
                    </View>
                )},
                { key: 'titleTop', component: (
                    <View>
                        <Text style={styles.titleTop}>Need help navigating our new app?</Text>
                    </View>
                )},
                { key: 'instructionContainer1', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Player Rewards</Text>
                        <Text style={styles.instruction}>Click the Rewards tab at the bottom of the screen.{"\n"}Then, scan your QR code at both{"\n"}check-in and check-out to collect your rewards!</Text>
                    </View>
                )},
                { key: 'instructionContainer2', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Player Profile</Text>
                        <Text style={styles.instruction}>Click the Profile tab at the bottom of the screen!{"\n"}From here you can view your information.{"\n"}If you need to update any information,{"\n"}please visit the TCTG website and login to your account!</Text>
                    </View>
                )},
                { key: 'instructionContainer3', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Reservations</Text>
                        <Text style={styles.instruction}>Click the three bars at the top of the screen.{"\n"}From here, you can book a new reservation,{"\n"}or view reservations that have already passed!</Text>
                    </View>
                )}
            ]}
            renderItem={({ item }) => item.component}
        />
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    heading: {
        fontSize: 30,
        fontFamily: 'chom',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    instructionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 15,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: GlobalStyles.colors.accent700,
        
    },
    instruction: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
        paddingBottom: 15,
        fontFamily: 'robreg'
    },
    title: {
        textAlign: 'center',
        padding: 10,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'bbnr'
    },
    titleTop: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10,
        fontSize: 23,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'headers'
    }
});

