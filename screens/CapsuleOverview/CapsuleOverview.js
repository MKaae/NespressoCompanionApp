import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import fake1 from "../../assets/fakeImageLocation/fake1.png";
import fake2 from "../../assets/fakeImageLocation/fake2.png";
import fake3 from "../../assets/fakeImageLocation/fake3.png";
import fake4 from "../../assets/fakeImageLocation/fake4.png";

export const CapsuleOverview = ({navigation, route}) => {
  const [text, setText] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  function setFakeData(){
    const tempObjects = [
      {id: 1, img:fake1},
      {id: 2, img:fake2},
      {id: 3, img:fake3},
      {id: 4, img:fake4},
    ]
    const objects = tempObjects.map(item => {
      return {
        id: item.id,
        img: item.img
      };
    });
    return objects;
  }
  // har lavet fake delay for at simulere et fetchkald så vi kan se hvordan det ser ud.
  useEffect(() => {
    const delay = setTimeout(() => {
      const fakes = setFakeData();
      setData(fakes);
      setLoading(false);
    }, 2000);
      return () => clearTimeout(delay);
  }, []);

  // Den her use effect er til når vi får sat en DB op. Den ovenover er temporary til testdata.
  // useEffect(() => { 
  //   fetch(url) //get call
  //     .then((response) => response.json()) 
  //     .then((json) => setData(json)) 
  //     .catch((error) => console.log(error)) 
  //     .finally(() => setLoading(false)) 
  // }, []);

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
      <ScrollView contentContainerStyle={styles.iconBoxesContainer}> 
      {loading ? ( // ternary operator for at checke om loading er true, false
        <Text> Loading...</Text>
      ) : (
        data.map((icon) => { // mapper dataen
          return ( // react kræver man bruger en key for at holde styr på vinduerne 
          // Der mangler tydeligvis lige at sætte ID ind i capsuleScreenRoute men ikke lige nået der til endnu resten virker.
          // Problemet er bare at den skal loade et fake id fra den næste side som jeg ikke kan har ingen data -> fake igen i guess
            <TouchableOpacity onPress={() => capsuleScreenRoute(icon.id)} key={icon.id} style={styles.iconBox}> 
              <Image source={icon.img} style={styles.img}/>
            </TouchableOpacity>
          )
        })
      )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBoxesContainer: {
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
  }
});