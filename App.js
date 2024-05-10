import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { IntroScreen } from "./screens/IntroScreen/IntroScreen.js";
import { Login } from "./screens/Login/Login.js";
import { Signup } from "./screens/Signup/Signup.js";
import { Home } from "./screens/Home/Home.js";
import { CapsuleOverview } from "./screens/CapsuleOverview/CapsuleOverview.js";
import { CapsuleScreen } from "./screens/CapsuleScreen/CapsuleScreen.js";
import { CapsuleRating } from "./screens/CapsuleRating/CapsuleRating.js";
import { Profile } from "./screens/Profile/Profile.js";
import { Stores } from "./screens/Stores/Stores.js";

import StatusContextProvider from "./context/generalContext.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <StatusContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRoute="IntroScreen">
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CapsuleOverview" component={CapsuleOverview} />
        <Stack.Screen name="CapsuleScreen" component={CapsuleScreen} />
        <Stack.Screen name="CapsuleRating" component={CapsuleRating} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Stores" component={Stores} />
      </Stack.Navigator>
    </NavigationContainer>
    </StatusContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
