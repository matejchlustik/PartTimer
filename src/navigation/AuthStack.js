import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";

const Stack = createNativeStackNavigator();

export default function AuthStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () => <View><Feather name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /></View>,
                headerTitleStyle: { color: "#fff" },
                headerStyle: { backgroundColor: "#333", fontFamily: "poppins-bold" },
                headerTintColor: "#fff",
                animation: "none"
            }} >
            <Stack.Screen name={"Login"} component={Login} />
            <Stack.Screen name={"Register"} component={Register} />
        </Stack.Navigator>
    )
}