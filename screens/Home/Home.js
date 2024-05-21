import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import updateProfile from "../../assets/home/updateProfile.jpg";
import { StatusContext } from "../../context/generalContext.js";
import seeCapsules from "../../assets/home/seeCapsules.jpg";
import seeRatings from "../../assets/home/seeRatings.jpg";
import { useState, useEffect, useContext } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import findStores from "../../assets/home/stores.jpg";
import { database } from "../../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const Home = ({ navigation, route }) => {
  const [imageSrc, setImageSrc] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(database, "users", statusContext.currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const storage = getStorage();

          let profileImageURL;
          if (userData.profileImage !== "") {
            profileImageURL = await getDownloadURL(ref(storage, `profile_images/${userData.profileImage}`));
          }
          const name = userData.name;

          if (profileImageURL !== undefined) {
            setImageSrc(profileImageURL);
          } else {
            const imageRef = ref(storage, "profile_images/temporaryImageProfile.jpg");
            await getDownloadURL(imageRef)
              .then((templateImage) => {
                setImageSrc(templateImage);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          }

          if (name !== "") {
            setName(name);
          } else {
            setName("Insert name...");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const statusContext = useContext(StatusContext);

  function capsuleOverViewRoute() {
    navigation.navigate("CapsuleOverview");
  }

  function capsuleRatingRoute() {
    navigation.navigate("CapsuleRating");
  }

  function profileRoute() {
    navigation.navigate("Profile");
  }

  function storesRoute() {
    navigation.navigate("Stores");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.rowBox}>
          <View style={styles.textBox}>
            <Text style={styles.homeText}>Welcome to Nespresso 🖤</Text>
            <Text style={styles.homeText}>Discover the coffee experience that best suits you.</Text>
          </View>
          <View style={styles.profileImageBox}>
            <TouchableOpacity onPress={profileRoute} style={styles.profile}>
              <Image source={{ uri: imageSrc }} style={styles.profileImage} />
            </TouchableOpacity>
            <Text style={styles.profileText}>{name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.navigationIcons}>
        <View style={styles.rowBox}>
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={capsuleOverViewRoute}>
              <Image source={seeCapsules} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={capsuleRatingRoute}>
              <Image source={seeRatings} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowBox}>
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={profileRoute}>
              <Image source={updateProfile} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={storesRoute}>
              <Image source={findStores} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: "100%",
    width: "100%",
    borderRadius: 75,
    resizeMode: "stretch",
  },
  topRow: {
    flex: 1,
    alignItems: "flex-end",
    width: "100%",
  },
  navigationIcons: {
    flex: 3,
  },
  iconBox: {
    flex: 0,
    width: 175,
    height: 175,
    margin: 10,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 13,
  },
  iconImage: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  textBox: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    margin: 2,
    marginTop: 40,
    fontSize: 20,
    textAlign: "center",
  },
  profileImageBox: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    maxWidth: 150,
    flexWrap: "wrap",
  },
});
