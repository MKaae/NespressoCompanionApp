import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { database } from "../../config/firebase.js"
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import StarRating from "react-native-star-rating-widget";


export const CapsuleScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [capsuleData, setCapsuleData] = useState(null);
    const [rating, setRating] = useState(0);
    const [globalRating, setGlobalRating] = useState(0);

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
            } finally {
                setLoading(false);
            }
        };

        if (route.params?.id) {
            fetchCapsuleData();
        }
    }, [route.params?.id]);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                capsuleData ? (
                    <View style={styles.contentContainer}>
                        <Text>Global rating of this product</Text>
                        <StarRating 
                            rating={capsuleData.rating}
                        />
                        <Text style={styles.textBox}>{capsuleData.description}</Text>
                        <View style={styles.imgContainer}>
                            <Image source={{ uri: capsuleData.img_url }} style={styles.img} />
                        </View>
                        <StarRating 
                            rating={rating}
                            onChange={setRating}
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