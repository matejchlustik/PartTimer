import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';

import OfferDetails from "../screens/offers/OfferDetails";
import Home from "../screens/home/Home";
import OffersList from "../screens/home/OffersList";

const Stack = createNativeStackNavigator();

export default function MainStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerRight: () =>
                    <TouchableHighlight underlayColor={"#8a8888"} style={{ marginRight: -4, borderRadius: 16, padding: 4 }} onPress={() => navigation.toggleDrawer()}>
                        <Feather name="menu" size={24} color="white" />
                    </TouchableHighlight>,
                headerTitleStyle: { color: "#fff", fontFamily: "poppins-bold" },
                headerStyle: { backgroundColor: "#333" },
                headerTintColor: "#fff",
                animation: "none",
            }} >
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"OffersList"} component={OffersList} />
        </Stack.Navigator>
    )
}