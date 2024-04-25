import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";

const ProfileScreen = () => {
  return (
    <View>
        {/* set the image background for the profile header */}
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/564x/93/2d/ec/932dec43e8579477d237e5e6c6a727b3.jpg",
        }}
        style={styles.logoContainer}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.heading}>Dakota Fulp</Text>
        </View>
      </ImageBackground>
        {/* set the text for the profile information in a scrollable list*/}
      <FlatList style={styles.listContainer}
            data={[
                { key: 'instructionContainer4', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Rewards Level</Text>
                        <Text style={styles.instruction}>Executive Rewards Member</Text>
                    </View>
                )},
                { key: 'instructionContainer1', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Email</Text>
                        <Text style={styles.instruction}>fulp.dakota@outlook.com</Text>
                    </View>
                )},
                { key: 'instructionContainer2', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Phone Number</Text>
                        <Text style={styles.instruction}>843-997-5231</Text>
                    </View>
                )},
                { key: 'instructionContainer3', component: (
                    <View style={styles.instructionContainer}>
                        <Text style={styles.title}>Address</Text>
                        <Text style={styles.instruction}>2050 US-501, Conway, SC 29526</Text>
                    </View>
                )}
            ]}
            renderItem={({ item }) => item.component}
        />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  heading: {
    fontSize: 50,
    height: 100,
    marginTop: 45,
    marginBottom: 0,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "bbnr",
    fontStyle: "italic",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "white",
  },
  instructionContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 15,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: GlobalStyles.colors.accent700,
  },
  instruction: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    paddingBottom: 15,
    fontFamily: "robreg",
  },
  title: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "bbnr",
  },
  titleTop: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10,
    fontSize: 23,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "headers",
  },
    listContainer: {
        paddingTop: 7,
        height: 650,
        backgroundColor: GlobalStyles.colors.primary100,
    },
});
