import { View, Text, StyleSheet, TextInput, Button, Platform } from "react-native";
import { useState, useEffect, useContext } from "react";
import { app, database } from "../../config/firebase.js";
import { addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeAuth, getReactNativePersistence, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { StatusContext } from "../../context/generalContext.js";

// web
// device
// let auth;
// if (Platform.OS === "web") {
//   auth = getAuth(app);
// } else {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
// }

export const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState(null);
  const statusContext = useContext(StatusContext);

  useEffect(() => {
    const auth_ = getAuth();
    const unsubscribe = onAuthStateChanged(auth_, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        statusContext.setCurrentUser(currentUser);
      } else {
        setUserId(null);
        statusContext.setCurrentUser(null);
      }
    });
    return () => unsubscribe(); 
  }, []);

  async function login() {
    console.log("login()");
    try {
      const newAuth = getAuth();
      const userCredential = await signInWithEmailAndPassword(newAuth, email, password);
      // statusContext.setCurrentUser(userCredential.user.uid);
      loginAndRouteToHome();
    } catch (error) {}
  }

  function loginAndRouteToHome() {
    console.log("loginAndRouteToHome()");
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputElementsLogin}>
        <Text style={styles.emailPassword}>Email</Text>
        <TextInput style={styles.textInputLogin} value={email} onChangeText={(text) => setEmail(text)} />
      </View>
      <View style={styles.inputElementsLogin}>
        <Text style={styles.emailPassword}>Password</Text>
        <TextInput
          style={styles.textInputLogin}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonLogin}>
        <Button title="Login" onPress={login} />
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
  inputElementsLogin: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInputLogin: {
    height: 40,
    width: 150,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
  },
  buttonLogin: {
    width: 150,
    margin: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
