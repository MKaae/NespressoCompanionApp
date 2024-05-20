import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import { database } from "../../config/firebase.js"
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import StarRating from "react-native-star-rating-widget";
import { StatusContext } from "../../context/generalContext.js";
import LoadingDots from "react-native-loading-dots";

export const CapsuleScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [capsuleData, setCapsuleData] = useState([]);
    const [rating, setRating] = useState(0);
    const statusContext = useContext(StatusContext);

    useEffect(() => {
        const fetchCapsuleData = async () => {
            try {
                const capsuleRef = doc(database, "capsules", "allCapsules");
                const capsuleDoc = await getDoc(capsuleRef);
                const allCapsules = capsuleDoc.data().capsules;
                const foundCapsule = allCapsules.find(capsule => capsule.id === route.params.id);
                if (foundCapsule) {
                    setCapsuleData(foundCapsule);
                } else {
                    console.error("Capsule not found.");
                }
            } catch (error) {
                console.error("Error fetching capsule data:", error);
            }
        };
        fetchCapsuleData();
    }, [route.params?.id]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = doc(database, "users", statusContext.currentUser.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const ratingsArray = userData.ratingArray;
                    const capsuleId = route.params.id;
                    console.log(userData);
                    console.log(capsuleData); 
                    if (Array.isArray(ratingsArray) && ratingsArray.length > 0) {
                        const capsuleRating = ratingsArray.find(item => item.id === capsuleId);
                        console.log(capsuleRating)
                        setRating(capsuleRating.rating);
                    } else {
                        console.log("User's ratings array is empty.");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [capsuleData, route.params?.id]);
    

    async function newRating(){
        try {
            const userRef = doc(database, "users", statusContext.currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                let ratingsArray = userData.ratingArray || []; 
                const capsuleId = capsuleData.id;
                const existingRatingIndex = ratingsArray.findIndex(item => item.id === capsuleId);
                if (existingRatingIndex !== -1) {
                    ratingsArray[existingRatingIndex].rating = rating;
                } else {
                    ratingsArray.push({ id: capsuleId, rating: rating });
                }
                await setDoc(userRef, { ratingArray: ratingsArray }, { merge: true });
                console.log("Rating updated successfully!");
            } else {
                console.error("User document not found.");
            }
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View>
                    <LoadingDots />
                </View>
            ) : (
                capsuleData ? (
                    <View style={styles.contentContainer}>
                        <Text>Global rating of this product</Text>
                        <StarRating 
                            rating={capsuleData.rating}
                            onChange={() => capsuleData.rating}
                            enableSwiping={false}
                        />
                        <Text style={styles.textBox}>{capsuleData.description}</Text>
                        <View style={styles.imgContainer}>
                            <Image source={{ uri: capsuleData.img_url }} style={styles.img} />
                        </View>
                        <StarRating 
                            rating={rating}
                            onChange={setRating}
                            onRatingEnd={() => newRating()}
                        />
                        <Text>Give the capsule your own rating.</Text>
                    </View>
                ) : (
                    <Text>Capsule not found.</Text>
                )
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        width: 300,
        height: 300,
        overflow: 'hidden',
        borderWidth: 2,
        borderRadius: 15,
    },
    textBox: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
    },
    img: {
        height: '100%',
        width: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        margin: 10,
    }
});