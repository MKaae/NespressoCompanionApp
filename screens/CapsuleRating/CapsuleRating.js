import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";
import { database } from "../../config/firebase.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import StarRating from "react-native-star-rating-widget";
import { StatusContext } from "../../context/generalContext.js";

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
                    const ratedCapsuleList = await Promise.all(userRatings.map(async (rating) => {
                        const capsuleData = Object.values(allCapsulesData).find(capsule => capsule.id === rating.id);
                        if (capsuleData) {
                            const imgRef = ref(storage, capsuleData.img_url);
                            const imgUrl = await getDownloadURL(imgRef);
                            return { id: rating.id, imgUrl, rating: rating.rating, ...capsuleData };
                        } else {
                            console.log(`Capsule with ID ${rating.id} not found.`);
                            return null;
                        }
                    }));
                    setRatedCapsules(ratedCapsuleList.filter(capsule => capsule !== null));
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

    function capsuleScreenRoute(id){
        navigation.navigate("CapsuleScreen", {id: id});
    }
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && ( 
                <Text>Loading...</Text>
            )}
    
            {ratedCapsules.length === 0 && !loading && ( 
                <Text style={styles.message}>You haven't rated anything yet.</Text>
            )}
    
            {!loading && ratedCapsules.map((capsule) => ( 
                <View key={capsule.id} style={styles.capsuleContainer}>
                    <TouchableOpacity onPress={() => capsuleScreenRoute(capsule.id)}>
                        <Image source={{ uri: capsule.imgUrl }} style={styles.image} />
                    </TouchableOpacity>
                    <Text>ID: {capsule.id}</Text>
                    <StarRating rating={userRatings.find(rating => rating.id === capsule.id)?.rating || 0} onChange={() => {}} starSize={20} />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        padding: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    capsuleContainer: {
        marginBottom: 20,
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 10
    }
});
