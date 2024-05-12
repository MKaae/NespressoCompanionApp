import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";

import { StatusContext } from "../../context/generalContext.js";
import PastafarianImage from "../../assets/pastafariantemp.png";

// fetch bruger informationer
// post updateDoc -> nye informationer
// target profile_images i storage

export const Profile = ({ navigation, route }) => {
  const statusContext = useContext(StatusContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function updateName() {
    console.log("updateName()");
    console.log(name);
  }

  function updatePassword() {
    console.log("updatePassword()");

    console.log(password);
    console.log(confirmPassword);
  }

  function deleteProfile(){
    console.log("deleteProfile()");
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileImageBox}>
        <TouchableOpacity style={styles.profile}>
          <Image source={PastafarianImage} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={styles.profileText}>helga@localhost.com</Text>

        <TextInput style={styles.profileText} onChangeText={(name) => setName(name)}>
          Helga, the Mighty Pastafarian
        </TextInput>
        <TouchableOpacity onPress={updateName}>
          <Text style={styles.profileButton}>Update name</Text>
        </TouchableOpacity>

        <TextInput style={styles.profileText} onChangeText={(password) => setPassword(password)}>
          Password
        </TextInput>
        <TextInput
          style={styles.profileText}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        >
          Confirm password
        </TextInput>
        <TouchableOpacity onPress={updatePassword}>
          <Text style={styles.profileButton}>Update password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteProfile}>
          <Text style={styles.profileButton}>Delete profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    padding: 20,
    justifyContent: "start",
    alignItems: "start",
  },
  profile: {
    flex: 0,
    height: 125,
    width: 125,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    flex: 1,
    borderRadius: 75,
    resizeMode: "contain",
  },
  profileImageBox: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 20,
    maxWidth: 350,
    marginTop: 20,
    flexWrap: "wrap",
  },
  profileButton: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "black",
    marginTop: 20,
  },
});
