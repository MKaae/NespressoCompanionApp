import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase.js";
import LoadingDots from "react-native-loading-dots";
import { useState, useEffect } from "react";

export const CapsuleOverview = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [capsules, setCapsules] = useState([]);

  // Manuelt opret collection link til storage capsule_url: url, capsule_id: string, name: string, description: string, rating: double
  // Fetch image collection with all capsules
  useEffect(() => {
    const fetchData = async () => {
      try {
        const capsulesCollection = collection(database, "capsules");
        const capsulesSnapshot = await getDocs(capsulesCollection);
        const capsulesData = capsulesSnapshot.docs.map((doc) => doc.data());
        setCapsules(capsulesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching capsules:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function capsuleScreenRoute(id) {
    navigation.navigate("CapsuleScreen", { id: id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageDescriptionView}>
        <Text style={styles.pageHeader}>Nespresso Original</Text>
        <Text style={styles.pageDescription}>Get inspired by our fellow coffee drinkers.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.iconBoxContainer}>
        {loading ? (
          <View>
            <LoadingDots />
          </View>
        ) : (
          capsules[0].capsules.map((capsule, index) => (
            <View key={index} style={styles.capsuleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.capsuleName}>{capsule.name}</Text>
                <Text style={styles.capsuleDescription}>{capsule.description}</Text>
              </View>

              <TouchableOpacity onPress={() => capsuleScreenRoute(capsule.id)} style={styles.iconBox}>
                <Image source={{ uri: capsule.img_url }} style={styles.img} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageDescriptionView: {
    padding: 10,
  },
  pageHeader: {
    fontWeight: "bold",
    fontSize: 30,
  },
  iconBoxContainer: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    fontSize: 25,
  },
  iconBox: {
    alignSelf: "center",
    margin: 30,
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
    borderRadius: 20,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    flex: 0,
    alignItems: "center",
    margin: 10,
  },
  capsuleContainer: {
    backgroundColor: "#F4F1E0",
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  capsuleName: {
    fontWeight: "bold",
    fontSize: 25,
  },
  capsuleDescription: {},
});
