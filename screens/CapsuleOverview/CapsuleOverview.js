import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { app, database } from "../../config/firebase.js";


export const CapsuleOverview = ({navigation, route}) => {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(true);
  const [capsules, setCapsules] = useState([]);

  // Manuelt opret collection link til storage capsule_url: url, capsule_id: string, name: string, description: string, rating: double
  // Fetch image collection with all capsules 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const capsulesCollection = collection(database, "capsules");
        const capsulesSnapshot = await getDocs(capsulesCollection);
        const capsulesData = capsulesSnapshot.docs.map(doc => doc.data());
        setCapsules(capsulesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching capsules:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function capsuleScreenRoute(id){
    navigation.navigate("CapsuleScreen", {id: id});
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline={true}
        placeholder="Search here"
        style={styles.input}
      />
      <ScrollView contentContainerStyle={styles.iconBoxContainer}> 
      {loading ? (
          <Text>Loading...</Text>
        ) : (
          capsules[0].capsules.map((capsule, index) => (
            <View key={index}>
              <View style={styles.textContainer}>
                <Text>{capsule.name}</Text>
                <Text>{capsule.description}</Text>
              </View>
              <TouchableOpacity
                onPress={() => capsuleScreenRoute(capsule.id)}
                style={styles.iconBox}
              >
                <Image source={{ uri: capsule.img_url }} style={styles.img} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBoxContainer: {
    minHeight: '100%',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    fontSize: 25,
  },
  iconBox: {  
    height: 300,
    width: 300,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    borderRadius: 20,
    margin: 30,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    flex: 0,
    alignItems: 'center',
    margin: 10,
  }
});



// THIS IS FOR YOU STEFFEN ONLY RUN ON YOUR COMPUTER THEN DELETE INSTANTLY 

  // useEffect(() => {
  //   const fetchCapsules = async () => {
  //     try {
  //       const storage = getStorage();
  //       const storageRef = ref(storage);
  //       const result = await listAll(storageRef);
  //       const capsulesData = await Promise.all(result.items.map(async (itemRef, index) => {
  //         const imgURL = await getDownloadURL(itemRef);
  //         const capsule_name = itemRef.name.split(".")[0];
  //         return {
  //           id: index, // Use the index as the ID
  //           name: capsule_name, // Set the name as required
  //           flavor: "",
  //           description: "", // Set the description as required
  //           img_url: imgURL,
  //           rating: 0 // Set the initial rating
  //         };
  //       }));
  //       await setDoc(doc(collection(database, "capsules"), "allCapsules"), {
  //         capsules: capsulesData
  //       });
  //       console.log("All capsules document created successfully!");
  //     } catch (error) {
  //       console.error("Error creating all capsules document:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchCapsules();
  // }, []);