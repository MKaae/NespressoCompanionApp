import { View, Text, TouchableOpacity } from "react-native";

export const IntroScreen = ({navigation, route}) => {

    function loginRoute(){
        navigation.navigate("Login");
    }

    function signupRoute(){
        navigation.navigate("Signup");
    }

    return (
        <View>
            <Text>IntroScreen</Text>
            <TouchableOpacity onPress={loginRoute}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signupRoute}>
                <Text>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}
