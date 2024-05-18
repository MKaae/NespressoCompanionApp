import { View, Text, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity } from "react-native";
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
import { collection, setDoc, doc } from "firebase/firestore";

import backgroundImage from "../../assets/intro-screen-bg.jpg";

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
    console.log("signup()");
    try {
      const newAuth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(newAuth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(database, "users", userId), {
        name: "",
        profileImage: "",
        ratingArray: [],
      });
      // Create en collection -> med userCredential.user.uid - collectionNAVN
      // Collection skal indeholde, navn: string, profilebillede: "" : profile_image/urltostorage, rating-array: [{capsule_id,int}]
      signupToLoginRoute();
    } catch (error) {
      console.log(error);
    }
  }

  function signupToLoginRoute() {
    console.log("signupToLoginRoute()");
    navigation.navigate("Login");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View>
        <Text style={{ marginBottom: 40, textAlign: "center", fontSize: 30, color: "white" }}>
          Sign up to the Nespresso Companion App
        </Text>
      </View>
      <View style={styles.inputElementsSignup}>
        <TextInput
          style={styles.textInputSignup}
          placeholder={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputElementsSignup}>
        <TextInput
          style={styles.textInputSignup}
          placeholder={"Password"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity onPress={signup}>
          <Text style={styles.btn}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputElementsSignup: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInputSignup: {
    height: 45,
    width: 250,
    backgroundColor: "white",
    margin: 7.5,
    padding: 5,
    borderRadius: 10,
  },
  btn: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    backgroundColor: "#E5CDA0",
    paddingVertical: 5,
    paddingHorizontal: 85,
    marginTop: 10,
    borderRadius: 20,
  },
});
