import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { StatusContext } from "../../context/generalContext.js";
import StarRating from "react-native-star-rating-widget";
import { useState, useEffect, useContext } from "react";
import { database } from "../../config/firebase.js";
import LoadingDots from "react-native-loading-dots";
import { doc, getDoc } from "firebase/firestore";
import { Divider } from "react-native-elements";

export const CapsuleRating = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [userRatings, setUserRatings] = useState([]);
  const [ratedCapsules, setRatedCapsules] = useState([]);
  const statusContext = useContext(StatusContext);

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const userRef = doc(database, "users", statusContext.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRatings(userData.ratingArray || []);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserRatings();
  }, [statusContext.currentUser.uid]);

  useEffect(() => {
    const fetchRatedCapsules = async () => {
      if (userRatings.length === 0) {
        return;
      }

      try {
        const allCapsulesRef = doc(database, "capsules", "allCapsules");
        const allCapsulesDoc = await getDoc(allCapsulesRef);
        if (allCapsulesDoc.exists()) {
          const allCapsulesData = allCapsulesDoc.data().capsules;
          const storage = getStorage();
          const ratedCapsuleList = await Promise.all(
            userRatings.map(async (rating) => {
              const capsuleData = Object.values(allCapsulesData).find((capsule) => capsule.id === rating.id);
              if (capsuleData) {
                const imgRef = ref(storage, capsuleData.img_url);
                const imgUrl = await getDownloadURL(imgRef);
                return { id: rating.id, imgUrl, rating: rating.rating, ...capsuleData };
              } else {
                console.log(`Capsule with ID ${rating.id} not found.`);
                return null;
              }
            })
          );
          setRatedCapsules(ratedCapsuleList.filter((capsule) => capsule !== null));
        } else {
          console.log("All capsules document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching capsules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedCapsules();
  }, [userRatings]);

  function capsuleScreenRoute(id) {
    navigation.navigate("CapsuleScreen", { id: id });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.header}>Welcome to your capsules!</Text>
        <Text style={styles.description}>Find your favorite capsules among your ratings.</Text>
      </View>
      {loading && (
        <View>
          <LoadingDots />
        </View>
      )}

      {ratedCapsules.length === 0 && !loading && (
        <Text style={styles.message}>You haven't rated anything yet.</Text>
      )}

      {!loading &&
        ratedCapsules.map((capsule) => (
          <View key={capsule.id} style={styles.capsuleContainer}>
            <Text style={{ margin: 10 }}>
              <Divider orientation="vertical" width={325} style={{ padding: 1 }} />
            </Text>

            <Text style={styles.capsuleHeader}>{capsule.name}</Text>
            <Text style={styles.textBox}>{capsule.description}</Text>

            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={() => capsuleScreenRoute(capsule.id)}>
                <Image source={{ uri: capsule.imgUrl }} style={styles.image} />
              </TouchableOpacity>
            </View>

            <Text style={styles.ratingHeader}>Personal Rating</Text>
            <StarRating
              rating={userRatings.find((rating) => rating.id === capsule.id)?.rating || 0}
              onChange={() => {}}
              starSize={20}
            />
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
  },
  description: {
    fontSize: 15,
    alignSelf: "center",
  },
  capsuleContainer: {
    marginBottom: 20,
    alignItems: "center",
    marginTop: 20,
  },
  imgContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  capsuleHeader: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
  },
  textBox: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
  },
  ratingHeader: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
});
