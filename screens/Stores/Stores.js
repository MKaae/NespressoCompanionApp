import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export const Stores = ({navigation, route}) => {
    const latitude = 56;
    const longitude = 10.5;
    const latitudeDelta = 4.5;
    const longitudeDelta = 4.5;

    const storeLocations = [
        {latitude: 56.149, longitude: 10.2049, title: "Nespresso Boutique Bruuns Galleri"},
        {latitude: 55.67908, longitude: 12.45843, title: "Nespresso Boutique Rødovre"},
        {latitude: 55.679976, longitude: 12.582147, title: "Nespresso Boutique København K"},
        {latitude: 55.62984, longitude: 12.57785, title: "Nespresso Boutique Field's"},
    ]

    function moveToLocation(id){
        if(1){
            latitude = 56.149; // Read only men min hjerne er færdig jeg stopper for i dag
            longitude = 10.2049;
        } else if (2){

        } else if (3) {

        } else if (4) {

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta,
                        longitudeDelta,
                      }}
                >
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
            <TouchableOpacity onPress={() => {moveToLocation(1)}}>
                <Text>Nespresso Boutique Bruuns Galleri</Text>
                <Text>M.P Bruuns Gade 25</Text>
                <Text>Aarhus</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {moveToLocation(2)}}>
                <Text>Nespresso Boutique Rødovre</Text>
                <Text>Rødovre Centrum 1M. St 38</Text>
                <Text>Rødovre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {moveToLocation(3)}}>
                <Text>Nespresso København K</Text>
                <Text>Kristen Bernikows Gade 5</Text>
                <Text>København</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {moveToLocation(4)}}>
                <Text>Nespresso Boutique Field's</Text>
                <Text>Arne Jacobsens Allé 12</Text>
                <Text>København S</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'lightblue',
    },
    mapContainer: {
        height:300,
        backgroundColor: 'white',
    },
    map: {
        height: '100%',
        width: '100%',
    }
});