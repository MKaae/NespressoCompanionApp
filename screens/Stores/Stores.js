import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { Divider } from "react-native-elements";

export const Stores = ({ navigation, route }) => {
  const [region, setRegion] = useState({
    latitude: 56,
    longitude: 10.5,
    latitudeDelta: 4.5,
    longitudeDelta: 4.5,
  });

  const storeLocations = [
    { latitude: 56.149, longitude: 10.2049, title: "Nespresso Boutique Bruuns Galleri" },
    { latitude: 55.67908, longitude: 12.45843, title: "Nespresso Boutique Rødovre" },
    { latitude: 55.679976, longitude: 12.582147, title: "Nespresso Boutique København K" },
    { latitude: 55.62984, longitude: 12.57785, title: "Nespresso Boutique Field's" },
  ];

  function moveToLocation(id) {
    if (id === 1) {
      setRegion({ latitude: 56.149, longitude: 10.2049, latitudeDelta: 0.1, longitudeDelta: 0.1 });
    } else if (id === 2) {
      setRegion({ latitude: 55.67908, longitude: 12.45843, latitudeDelta: 0.1, longitudeDelta: 0.1 });
    } else if (id === 3) {
      setRegion({ latitude: 55.679976, longitude: 12.582147, latitudeDelta: 0.1, longitudeDelta: 0.1 });
    } else if (id === 4) {
      setRegion({ latitude: 55.62984, longitude: 12.57785, latitudeDelta: 0.1, longitudeDelta: 0.1 });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region}>
          {storeLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.title}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.locationContainer}>
      <Text style={{ margin: 10 }}>
          <Divider orientation="vertical" width={325} style={{ padding: 1 }} />
        </Text>
        <TouchableOpacity
          onPress={() => {
            moveToLocation(1);
          }}
        >
          <Text style={styles.locationHeader}>Nespresso Boutique Bruuns Galleri</Text>
          <Text>M.P Bruuns Gade 25</Text>
          <Text>Aarhus</Text>
        </TouchableOpacity>

        <Text style={{ margin: 10 }}>
          <Divider orientation="vertical" width={325} style={{ padding: 1 }} />
        </Text>

        <TouchableOpacity
          onPress={() => {
            moveToLocation(2);
          }}
        >
          <Text style={styles.locationHeader}>Nespresso Boutique Rødovre</Text>
          <Text>Rødovre Centrum 1M. St 38</Text>
          <Text>Rødovre</Text>
        </TouchableOpacity>
        
        <Text style={{ margin: 10 }}>
          <Divider orientation="vertical" width={325} style={{ padding: 1 }} />
        </Text>
        
        <TouchableOpacity
          onPress={() => {
            moveToLocation(3);
          }}
        >
          <Text style={styles.locationHeader}>Nespresso København K</Text>
          <Text>Kristen Bernikows Gade 5</Text>
          <Text>København</Text>
        </TouchableOpacity>

        <Text style={{ margin: 10 }}>
          <Divider orientation="vertical" width={325} style={{ padding: 1 }} />
        </Text>
        
        <TouchableOpacity
          onPress={() => {
            moveToLocation(4);
          }}
        >
          <Text style={styles.locationHeader}>Nespresso Boutique Field's</Text>
          <Text>Arne Jacobsens Allé 12</Text>
          <Text>København S</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'lightblue',
  },
  mapContainer: {
    height: 300,
    backgroundColor: "white",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  locationContainer: {
    margin: 20,
  },
  locationHeader: {
    fontWeight: "bold",
  },
  divider: {
    width: "100%", // Assuming you want it to span the full height
    height: 4, // This makes it bold
    color: "black",
    backgroundColor: "black", // This makes it bold and visible
    marginVertical: 20, // Optional: adds some vertical margin around the divider
  },
});
