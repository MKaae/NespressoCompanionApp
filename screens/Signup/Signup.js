import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

export const Signup = ({navigation, route}) => {
    const [email, setEmail] = useState();
    const [pw, setPw] = useState();

    function signupToLoginRoute() {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputElementsSignup}>
                <Text style={styles.emailPassword}>Email</Text>
                <TextInput
                    style={styles.textInputSignup}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputElementsSignup}>
                <Text style={styles.emailPassword}>Password</Text>
                <TextInput
                    style={styles.textInputSignup}
                    value={pw}
                    onChangeText={(text) => setPw(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonSignup}>
                <Button title="Signup" onPress={signupToLoginRoute} />
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
    inputElementsSignup: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    textInputSignup: {
        height: 40,
        width: 150,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
    },
    buttonSignup: {
        width: 150,
        margin: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
})