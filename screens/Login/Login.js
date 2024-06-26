import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { StatusContext } from "../../context/generalContext.js";
import backgroundImage from "../../assets/intro-screen-bg.jpg";
import { useState, useEffect, useContext } from "react";
import Toast from "react-native-toast-message";

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
    try {
      const newAuth = getAuth();
      const userCredential = await signInWithEmailAndPassword(newAuth, email, password);
      loginAndRouteToHome();
    } catch (error) {
      showToast();
    }
  }

  function loginAndRouteToHome() {
    navigation.navigate("Home");
  }

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "Password or username incorrect",
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View>
        <Text style={{ marginBottom: 40, textAlign: "center", fontSize: 30, color: "white" }}>
          Login to the Nespresso Companion App
        </Text>
      </View>
      <View style={styles.inputElementsLogin}>
        <TextInput
          style={styles.textInputLogin}
          placeholder={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputElementsLogin}>
        <TextInput
          style={styles.textInputLogin}
          placeholder={"Password"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity onPress={login}>
          <Text style={styles.btn}>LOGIN</Text>
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
  inputElementsLogin: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInputLogin: {
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
