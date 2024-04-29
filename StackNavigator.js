import { View, Text, StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./screens/WelcomeScreen";
import SignIn from "./screens/Registration/SignIn";
import SignUp from "./screens/Registration/SignUp";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
// import HomeScreen from "./screens/HomeScreen";
// import MoodScreen from "./screens/MoodScreen";
// import MapsScreen from "./screens/MapsScreen";
// import SettingsScreen from "./screens/SettingsScreen";
// import CountryScreen from "./screens/CountryScreen";
// import Test from "./screens/Test";
// import QuotesScreen from "./screens/QuotesScreen";
// import Terms from "./screens/Terms";
// import AboutScreen from "./screens/Aboutscreen"; 

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
         <Stack.Screen name="SignUp" component={SignUp} />
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;