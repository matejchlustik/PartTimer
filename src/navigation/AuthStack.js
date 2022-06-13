import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';

import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";

const Stack = createNativeStackNavigator();

export default function AuthStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () =>
                    <TouchableHighlight underlayColor={"#8a8888"} style={{ marginRight: -4, borderRadius: 16, padding: 4 }} onPress={() => navigation.toggleDrawer()}>
                        <Feather name="menu" size={24} color="white" />
                    </TouchableHighlight>,
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