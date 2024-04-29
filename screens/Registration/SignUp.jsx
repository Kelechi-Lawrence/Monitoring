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
    ScrollView,
    Platform
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import DataContext from "../../context/DataContext";
  import { useContext } from "react";

  const SignUp = ({ navigation }) => {
    const {
        email,
        password,
        user,
        username,
        phone,
        signUpError,
        setEmail,
        setPassword,
        submit,
        setPhone,
        setUsername,
        SignUpLoading,
      } = useContext(DataContext);

      async function redirect() {
        await user;
        setTimeout(() => {
          // 👇 Redirects to about page, note the `replace: true`
          // navigate(`/profile`, { replace: false });
          navigation.navigate('SignIn');
        });
      }
    
      user ? redirect() : '';

      const handleEmailChange = text => {
        setEmail(text);
      };
      const handlePasswordChange = text => {
        setPassword(text);
      }
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
                paddingTop: 30,
              }}
            >
              {/* {colors.background == "white" ? (
                <Image
                  style={{ width: 320, height: 230 }}
                  source={require("../../assets/signin.png")}
                />
              ) : (
                <Image
                  style={{ width: 320, height: 230 }}
                  source={require("../../assets/signinDark.png")}
                />
              )} */}
              <ScrollView
                contentContainerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                showsVerticalScrollIndicator={false}
              >
                <Text
                  style={{
                    paddingTop: 30,
                    fontSize: 25,
                    fontWeight: 500,
                    color: "black",
                    paddingBottom: 20,
                  }}
                >
                  Create Account
                </Text>
                
                <TextInput
                  style={[styles.textInput, { color: "black" }]}
                  placeholderTextColor="gray"
                  placeholder="Your email"
                //   value={email}
                  textContentType="emailAddress"
                  onChangeText={handleEmailChange}
                />
                <TextInput
                  style={[styles.textInput, { color:"black" }]}
                  placeholderTextColor="gray"
                  placeholder="Your password"
                //   value={password}
                  onChangeText={handlePasswordChange}
                  textContentType="password"
                  secureTextEntry={true}
                  
                />
               
                <TouchableOpacity style={styles.button} onPress={() => submit()}>
                  <Text style={{ color: "white", fontSize: 15 }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: 20 }}
                  onPress={() => navigation.goBack()}
                >
                  <Text
                    style={{ color: "#959598", fontSize: 15, paddingBottom: 20 }}
                  >
                    already have an account?
                    <Text style={{ color: "#2DA6FF" }}>Sign In</Text>
                  </Text>
                </TouchableOpacity>
                <Text>{signUpError}</Text>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  };
  
  export default SignUp;
  
  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: "#EDF0F7",
      width: "90%",
      height: 45,
      padding: 10,
      fontSize: 13,
      marginTop: 10,
      borderRadius: 3,
      color: "#959598",
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