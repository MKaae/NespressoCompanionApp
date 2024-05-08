import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import fake1 from "../../assets/fakeImageLocation/fake1.png";
import fake2 from "../../assets/fakeImageLocation/fake2.png";
import fake3 from "../../assets/fakeImageLocation/fake3.png";
import fake4 from "../../assets/fakeImageLocation/fake4.png";

export const CapsuleScreen = ({navigation, route}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    function setFakeData(){
        const tempObjects = [
          {id: 1, img:fake1, description: "This is a fartblossom1, there are many fartblossoms like it, but this is the only fartblossom like this."},
          {id: 2, img:fake2, description: "This is a fartblossom2, there are many fartblossoms like it, but this is the only fartblossom like this."},
          {id: 3, img:fake3, description: "This is a fartblossom3, there are many fartblossoms like it, but this is the only fartblossom like this."},
          {id: 4, img:fake4, description: "This is a fartblossom4, there are many fartblossoms like it, but this is the only fartblossom like this."},
        ]
        const objects = tempObjects.map(item => {
          return {
            id: item.id,
            img: item.img,
            description: item.description
          };
        });
        return objects;
      }
      // fake data igen men det burde være klar til at blive sat op. Capsuleoverview har en rigtig fetch useeffect.
      useEffect(() => {
        const delay = setTimeout(() => {
          const fakes = setFakeData();
          setData(fakes.find(item => item.id === route.params?.id));
          setLoading(false);
        }, 2000);
          return () => clearTimeout(delay);
      }, [route.params?.id]);

    return (
        <View style={styles.container}>
            {loading ? ( 
                <Text> Loading...</Text>
            ) : (
                <View>
                    <View style={styles.imgContainer}>
                        <Image source={data.img} style={styles.img}/>
                    </View>
                    <Text style={styles.textBox}>{data.description}</Text>
                    <Text style={styles.textBox}>{data.description}</Text>
                    <Text style={styles.textBox}>{data.description}</Text>
                    <Text style={styles.textBox}>{data.description}</Text>
                </View>
            )}
        </View>
    )
}

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
    }
});