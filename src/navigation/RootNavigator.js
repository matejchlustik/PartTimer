import { useState, useEffect } from "react"
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

import { UserContext } from "../contexts/UserContext"
import TestScreen from "../screens/TestScreen";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import CustomDrawer from "../components/CustomDrawer"
import AddOffer from "../screens/offers/AddOffer";
import MyProfile from "../screens/profile/MyProfile";


const Drawer = createDrawerNavigator();

export default function RootNavigator() {

    const [user, setUser] = useState();

    useEffect(() => {
        async function getValueFor(key) {
            let result = await SecureStore.getItemAsync(key);
            if (result) {
                setUser(result);
            } else {
                setUser(null);
            }
        }
        getValueFor("token");
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <StatusBar style="light" />
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="HomeStack"
                    screenOptions={({ navigation }) => ({
                        drawerPosition: "right",
                        drawerInactiveTintColor: "#fff",
                        drawerActiveBackgroundColor: "#feda47",
                        drawerActiveTintColor: "#172b6b",
                        drawerLabelStyle: { fontSize: 16, fontFamily: "poppins-medium", top: 2 },
                        headerRight: () => <View style={{ marginHorizontal: 15 }}><Feather name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /></View>,
                        headerLeft: () => null,
                        headerTitleStyle: { color: "#fff", fontFamily: "poppins-bold" },
                        headerStyle: { backgroundColor: "#333" },
                        headerTintColor: "#fff",
                        animation: "none",
                    })}
                    drawerContent={props => <CustomDrawer {...props} />}
                >
                    <Drawer.Screen navigationKey={user ? 'user' : 'guest'} name={"HomeStack"} component={MainStack} options={{ headerShown: false, drawerItemStyle: { marginTop: 30 } }} />
                    {user ? (
                        <>
                            <Drawer.Screen name={"Add Offer"} component={AddOffer} />
                            <Drawer.Screen
                                name={"My Profile"}
                                component={MyProfile}
                                options={({ navigation }) => ({
                                    headerStyle: { backgroundColor: "#feda47" },
                                    headerTitleStyle: { color: "#172b6b", fontFamily: "poppins-bold" },
                                    headerRight: () => <View style={{ marginHorizontal: 15 }}><Feather name="menu" size={24} color="#172b6b" onPress={() => navigation.toggleDrawer()} /></View>,
                                })}
                            />
                        </>
                    ) :
                        <>
                            <Drawer.Screen name={"Log in"} component={AuthStack} options={{ drawerItemStyle: { display: "none" }, headerShown: false }} />
                        </>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    )
}
