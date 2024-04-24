import { View, Text, TouchableOpacity } from "react-native";

export const CapsuleOverview = ({navigation, route}) => {

  function capsuleScreenRoute(){
    navigation.navigate("CapsuleScreen");
  }

  return (
    <View>
      <Text>CapsuleOverview</Text>
      <TouchableOpacity onPress={capsuleScreenRoute}>
        <Text>CapsuleScreen</Text>
      </TouchableOpacity>
    </View>
  )
}