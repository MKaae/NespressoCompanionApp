import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import { app, database } from "../../config/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { initializeAuth, getReactNativePersistence, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

let auth;
if (Platform.OS === "web") {
    auth = getAuth(app);
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }

export const Signup = ({ navigation, route }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState(null);



  useEffect(() => {
    const auth_ = getAuth();
    const unsubscribe = onAuthStateChanged(auth_, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);


  async function signup() {
    console.log("signUp()");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up with: " + userCredential.user.uid);
      signupToLoginRoute();
    } catch (error) {
      console.log(error);

    }
  }

  function signupToLoginRoute() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputElementsSignup}>
        <Text style={styles.emailPassword}>Email</Text>
        <TextInput style={styles.textInputSignup} value={email} onChangeText={(text) => setEmail(text)} />
      </View>
      <View style={styles.inputElementsSignup}>
        <Text style={styles.emailPassword}>Password</Text>
        <TextInput
          style={styles.textInputSignup}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonSignup}>
        <Button title="Signup" onPress={signup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emailPassword: {
    fontSize: 17,
  },
  inputElementsSignup: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInputSignup: {
    height: 40,
    width: 150,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
  },
  buttonSignup: {
    width: 150,
    margin: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
