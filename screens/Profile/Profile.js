import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";
import { app, database } from "../../config/firebase.js"
import { collection, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import uuid from 'react-native-uuid'
import * as ImagePicker from "expo-image-picker";
import { storage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getStorage, listAll } from "firebase/storage";


import { StatusContext } from "../../context/generalContext.js";
import PastafarianImage from "../../assets/pastafariantemp.png";
import LoadingDots from "react-native-loading-dots";
import Toast from 'react-native-toast-message';

export const Profile = ({ navigation, route }) => {
  const statusContext = useContext(StatusContext);
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [loading, setLoading] = useState(true);



  useEffect( () => {

     const fetchData = async () => {
      try {
        const userRef = doc(database, "users", statusContext.currentUser.uid);
        const userDoc = await getDoc(userRef);
  
        if(userDoc.exists()){
          const userData = userDoc.data();
          const storage = getStorage();
          let profileImageURL;
          if(userData.profileImage !== ""){
            profileImageURL = await getDownloadURL(ref(storage, `profile_images/${userData.profileImage}`));
          }
          // console.log(profileImageURL);
          const name = userData.name;

          if(profileImageURL !== undefined){
            // console.log("Image found. Using user image.");

            setImageSrc(profileImageURL);

          } else {
            // console.log("Image not found. Using template image.");

            const imageRef = ref(storage, "profile_images/temporaryImageProfile.jpg");
            await getDownloadURL(imageRef)
              .then((templateImage) => {
                setImageSrc(templateImage);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
            }

            if(name !== ""){
              // console.log("Name found. Updating name.");
              setName(name);
            } else {
              setName("Insert name...");
              // console.log("Name not found. Using template name.");
            }
            setLoading(false);
        }
       } catch(error){
          console.error(error);
       }
     }
     fetchData();
  }, []);

   async function changeImage(){
      // console.log("changeImage()");
      
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });

      if (!image.canceled){
        setImageSrc(image.assets[0].uri);
      } else {
        console.log("No image found.");
      }
   }

  async function saveChanges() {
    setLoading(true);
    // console.log("saveChanges()");

    const res = await fetch(imageSrc);
    const blob = await res.blob();
    const newId = uuid.v4();
    let storageRef;
    let storage = getStorage();
    
    try {
      storageRef = ref(storage, `/profile_images/${newId}`);
    } catch(error){
      console.log(error)
    }
    
    await uploadBytes(storageRef, blob);
    
    const userRef = doc(database, "users", statusContext.currentUser.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const fileRef = ref(storage, `/profile_images/${userData.profileImage}`);

    if(userData.profileImage !== ""){
      // console.log(fileRef);

      deleteObject(fileRef).then(() => {
        console.log("Image deleted successfully")
      }).catch((error) => {
        console.error(error);
      });    
      showToast();
    }

    try {
      await setDoc(userRef, {name: name, profileImage: newId}, {merge: true});
      console.log("Info updated successfully.");
    } catch(error){
      console.log(error);
    }
    setLoading(false);
  }

  
  async function deleteProfile() {
    // console.log("deleteProfile()");
  
    try {
      const storage = getStorage();
      const userRef = doc(database, "users", statusContext.currentUser.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const fileRef = ref(storage, `/profile_images/${userData.profileImage}`);
      
      // console.log("Deleting profile image...");
      await deleteObject(fileRef);
      // console.log("Profile image deleted successfully");
  
      // console.log("Deleting user document...");
      await deleteDoc(userRef);
      // console.log("User document deleted successfully");

      // console.log("Deleting user from Authentication...");
      await statusContext.currentUser.delete();
      // console.log("User deleted from Authentication successfully");
  
      navigation.navigate("IntroScreen");
      } catch (error) {
      console.error(error);


    }
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated profile information.'
    });
  }

  return (
    <View style={styles.container}>
      
      {!!loading ? (
          <View>
            <LoadingDots />
          </View>
      ) : (
      <View style={styles.profileImageBox}>
        <TouchableOpacity style={styles.profile}>
          <Image source={{ uri: imageSrc }} style={styles.profileImage} />
        </TouchableOpacity>

        <TextInput style={styles.profileText} value={name} onChangeText={(name) => setName(name)}>
        </TextInput>

        <TouchableOpacity onPress={changeImage}>
          <Text style={styles.profileButton}>Change image</Text>
        </TouchableOpacity>
            
              
        <TouchableOpacity onPress={saveChanges}>
          <Text style={styles.profileButton}>Save changes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteProfile}>
          <Text style={styles.profileButton}>Delete profile</Text>
        </TouchableOpacity>
      </View>
      )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profile: {
    marginTop: 50,
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
    height: '100%',
    width: '100%',
    borderRadius: 75,
    resizeMode: "stretch",
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
    color: "black",
    backgroundColor: "#E5CDA0",
    paddingVertical: 5,
    paddingHorizontal: 85,
    marginTop: 10,
    borderRadius: 20,
  },
});
