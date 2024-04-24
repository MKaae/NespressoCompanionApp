import { View, Text, TouchableOpacity } from "react-native";

export const Home = ({ navigation, route }) => {

    function capsuleOverViewRoute(){
        navigation.navigate("CapsuleOverview");
    }

    function capsuleRatingRoute(){
        navigation.navigate("CapsuleRating");
    }

    function profileRoute(){
        console.log("profileRoute()");
        navigation.navigate("Profile");
    }

    function storesRoute(){
        console.log("storeRoute()");
        navigation.navigate("Stores");
    }


    
    return (
        <View>
            <Text>HomeScreen</Text>
    
            <TouchableOpacity onPress={capsuleOverViewRoute}>
                <Text>See capsules</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={capsuleRatingRoute}>
                <Text>See Ratings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={profileRoute}>
                <Text>Update profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={storesRoute}>
                <Text>Find stores</Text>
            </TouchableOpacity>
        </View>
    )
}