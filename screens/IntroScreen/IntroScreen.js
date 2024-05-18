import { View, Text, StyleSheet, Button, Platform, ImageBackground, TouchableOpacity } from "react-native";
import { app, database } from "../../config/firebase.js";
// import { StatusContext } from "../../context/generalContext.js";

import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import backgroundImage from "../../assets/intro-screen-bg.jpg";

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  // Check if auth has already been initialized to avoid re-initializing
  if (!getAuth().app) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } else {
    auth = getAuth(app);
  }
}

export const IntroScreen = ({ navigation, route }) => {
  function loginRoute() {
    navigation.navigate("Login");
  }

  function signupRoute() {
    navigation.navigate("Signup");
  }

  return (
    // <StatusContext.Provider value={{ currentUser: null }}>

    <ImageBackground source={backgroundImage} style={styles.container}>
      <View>
        <View>
          <Text style={styles.introText}>Welcome to the Nespresso Companion App</Text>
        </View>
        <View style={{marginTop: 200}}>
          <TouchableOpacity onPress={signupRoute}>
            <Text style={styles.btn}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signupRoute}>
            <Text style={styles.btn}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    // </StatusContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  introText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  buttonLoginSignup: {
    margin: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  btn: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    backgroundColor: "#E5CDA0",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    borderRadius: 20,
  },
});
