import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { useCallback } from "react";
// SplashScreen.preventAutoHideAsync();

const WelcomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView>
      {/* <Image style={styles.image} source={require("../assets/Star.png")} /> */}
      <View style={styles.textView}>
        <Text style={styles.text}>
          Health {"\n"}Monitoring{"\n"}System{"\n"}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.replace("SignIn")}
          style={styles.button}
        >
          <Text style={styles.buttonText} >Get Started</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    right: 0,
  },
  text: {
    fontSize: 45,
    fontWeight: "800",
    // fontFamily: "Poppins",
    textAlign: "left",
    color: "#0C1823",
    lineHeight: 65,
  },
  textView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#0C1823",
    position: "absolute",
    bottom: 40,
    height: 50,
    width: "80%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    // fontFamily: "Poppins",
    fontWeight: "200",
  },
});