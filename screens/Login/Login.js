import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

export const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState();
    const [pw, setPw] = useState();

    function loginAndRouteToHome() {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputElementsLogin}>
                <Text style={styles.emailPassword}>Email</Text>
                <TextInput
                    style={styles.textInputLogin}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputElementsLogin}>
                <Text style={styles.emailPassword}>Password</Text>
                <TextInput
                    style={styles.textInputLogin}
                    value={pw}
                    onChangeText={(text) => setPw(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonLogin}>
                <Button title="Login" onPress={loginAndRouteToHome} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailPassword: {
        fontSize: 17,
    },
    inputElementsLogin: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    textInputLogin: {
        height: 40,
        width: 150,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
    },
    buttonLogin: {
        width: 150,
        margin: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
})