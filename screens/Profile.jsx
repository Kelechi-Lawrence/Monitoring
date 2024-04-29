import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 10, position: "absolute", left: 10 }}
        >
          <AntDesign name="arrowleft" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.text, fontWeight: 700, fontSize: 18 }}>
          Profile
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ color: colors.text, fontSize: 25, fontWeight: 700 }}>
            Hi, Jit Banki!
          </Text>
          <Text style={{ paddingTop: 5, color: colors.text, fontSize: 12 }}>
            Hope you're having a nice day
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            position: "absolute",
            right: 30,
            marginTop: 20,
            zIndex: 1,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../assets/pic.jpg")}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 50, marginLeft: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: colors.placeholder,
              paddingBottom: 10,
            }}
          >
            Email
          </Text>
          <Text style={{ fontSize: 15, color: colors.text }}>
            user@email.com
          </Text>
          <View
            style={{
              backgroundColor: colors.placeholder,
              width: "93%",
              height: 0.5,
              marginTop: 10,
            }}
          ></View>
        </View>
      </View>
      <View style={{ marginTop: 30, marginLeft: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: colors.placeholder,
              paddingBottom: 10,
            }}
          >
            Phone Number
          </Text>
          <Text style={{ fontSize: 15, color: colors.text }}>00112223344</Text>
          <View
            style={{
              backgroundColor: colors.placeholder,
              width: "93%",
              height: 0.5,
              marginTop: 10,
            }}
          ></View>
        </View>
      </View>
      <View style={{ marginTop: 30, marginLeft: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: colors.placeholder,
              paddingBottom: 10,
            }}
          >
            Gender
          </Text>
          <Text style={{ fontSize: 15, color: colors.text }}>Male</Text>
          <View
            style={{
              backgroundColor: colors.placeholder,
              width: "93%",
              height: 0.5,
              marginTop: 10,
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "absolute",
          bottom: 10,
        }}
      >
      </View>
    </SafeAreaView>
  );
};

export default Profile;