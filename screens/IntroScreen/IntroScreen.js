import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { app, database } from "../../config/firebase.js";
// import { StatusContext } from "../../context/generalContext.js";

import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
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
    <View style={styles.container}>
      <View>
        <Text style={styles.introText}>Welcome to the Nespresso Companion App</Text>
        <Text style={styles.introText}>You are not logged in.</Text>
        <Text style={styles.introText}>Login or signup to continue</Text>
        <View style={styles.rowBox}>
          <View style={styles.buttonLoginSignup}>
            <Button title="Login" onPress={loginRoute} />
          </View>
          <View style={styles.buttonLoginSignup}>
            <Button title="Signup" onPress={signupRoute} />
          </View>
        </View>
      </View>
    </View>
    // </StatusContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue", // This should be replaced with a background image
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  introText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
  },
  buttonLoginSignup: {
    margin: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
