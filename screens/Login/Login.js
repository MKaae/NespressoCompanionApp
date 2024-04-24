import { View, Text, TouchableOpacity } from "react-native";

export const Login = ({navigation, route}) => {

    function loginAndRouteToHome(){
        navigation.navigate("Home");
    }

    return (
        <View>
            <Text>LoginScreen</Text>
            <TouchableOpacity onPress={loginAndRouteToHome}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}