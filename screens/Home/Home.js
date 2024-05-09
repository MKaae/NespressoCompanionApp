import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PastafarianImage from "../../assets/pastafariantemp.png";
import findStores from "../../assets/findStores.png";
import seeCapsules from "../../assets/seeCapsules.png";
import seeRatings from "../../assets/seeRatings.png";
import updateProfile from "../../assets/updateProfile.png";

import { StatusContext } from "../../context/generalContext.js";
import { useContext } from "react";

export const Home = ({ navigation, route }) => {
  const statusContext = useContext(StatusContext);

  function capsuleOverViewRoute() {
    navigation.navigate("CapsuleOverview");
  }

  function capsuleRatingRoute() {
    navigation.navigate("CapsuleRating");
  }

  function profileRoute() {
    console.log("profileRoute()");
    navigation.navigate("Profile");
  }

  function storesRoute() {
    console.log("storeRoute()");
    navigation.navigate("Stores");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.rowBox}>
          <View style={styles.textBox}>
            {statusContext.currentUser && (
              <>
                <Text>{statusContext.currentUser.uid}</Text>
              </>
            )}
            {!statusContext.currentUser && <Text>Du er ikke logget på</Text>}

            <Text style={styles.homeText}>This is a textbox.</Text>
            <Text style={styles.homeText}>This is a textbox.</Text>
            <Text style={styles.homeText}>This is a textbox.</Text>
            <Text style={styles.homeText}>This is a textbox.</Text>
            <Text style={styles.homeText}>This is a textbox.</Text>
          </View>
          <View style={styles.profileImageBox}>
            <TouchableOpacity onPress={profileRoute} style={styles.profile}>
              <Image source={PastafarianImage} style={styles.profileImage} />
            </TouchableOpacity>
            <Text style={styles.profileText}>Welcome Helga, the Mighty Pastafarian !</Text>
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
    backgroundColor: "lightblue",
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
    flex: 1,
    borderRadius: 75,
    resizeMode: "contain",
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
    fontSize: 20,
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
