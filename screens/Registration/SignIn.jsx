import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform
  } from "react-native";
  import React, {useContext,useEffect, useState} from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import DataContext from '../..//context/DataContext';

  
  const SignIn = ({ navigation }) => {
    const {
      email,
      password,
      loginError,
      LoginLoading,
      allUsers,
      signIn,
      signed,
      setEmail,
      setPassword,
      loggedInUser,
    } = useContext(DataContext);

    async function redirect() {
      await signed;
      setTimeout(() => {
        // 👇 Redirects to Home Screen
        navigation.navigate('Home');
      });
    }
  
    if (signed === true) {
      redirect();
    }

    const handleEmailChange = text => {
      setEmail(text);
    };
    const handlePasswordChange = text => {
      setPassword(text);
    };

    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // style={{ flex: 1, width: "100%" }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* {colors.background == "white" ? (
                <Image
                  style={{ width: 320, height: 230 }}
                  source={require("../../assets/createAccount.png")}
                />
              ) : (
                <Image
                  style={{ width: 320, height: 230 }}
                  source={require("../../assets/createAccountDark.png")}
                />
              )} */}
  
              <Text
                style={{
                  paddingTop: 30,
                  fontSize: 25,
                  fontWeight: 500,
                  color: "black",
                  paddingBottom: 20,
                }}
              >
                Sign In
              </Text>
              <TextInput
                style={[styles.textInput, { color: "black" }]}
                placeholder="Your email"
                placeholderTextColor="black"
                // value={email}
                required
                onChangeText={handleEmailChange}
              />
              <TextInput
                style={[styles.textInput, { color: "black" }]}
                placeholderTextColor="black"
                placeholder="Your password"
                // value={password}
                secureTextEntry={true}
                required
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => signIn()}
              >
                <Text style={{ color: "white", fontSize: 15 }}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingTop: 20 }}
                onPress={() => navigation.navigate("ResetPassword")}
              >
                <Text style={{ color: "#959598", fontSize: 15 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingTop: 10 }}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text
                  style={{ color: "#959598", fontSize: 15, paddingBottom: 0 }}
                >
                  Dont have an Account?
                  <Text style={{ color: "#2DA6FF" }}> Sign Up</Text>
                </Text>
              </TouchableOpacity>
              <Text>{loginError}</Text>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  };
  
  export default SignIn;
  
  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: "#EDF0F7",
      width: "90%",
      height: 45,
      padding: 10,
      fontSize: 13,
      marginTop: 10,
      borderRadius: 3,
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      height: 45,
      borderRadius: 3,
      marginTop: 10,
      backgroundColor: "#0094FF",
      color: "white",
    },
  });