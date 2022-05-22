import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

import OfferDetails from "../screens/offers/OfferDetails";
import Home from "../screens/home/Home";
import OffersList from "../screens/home/OffersList";

const Stack = createNativeStackNavigator();

export default function MainStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerRight: () => <View><Feather name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /></View>,
                headerTitleStyle: { color: "#fff", fontFamily: "poppins-bold" },
                headerStyle: { backgroundColor: "#333" },
                headerTintColor: "#fff",
                animation: "none"
            }} >
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"OfferDetails"} component={OfferDetails} />
            <Stack.Screen name={"OffersList"} component={OffersList} />
        </Stack.Navigator>
    )
}