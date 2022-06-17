import { useState, useEffect } from "react"
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableHighlight } from "react-native";
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { Provider } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { UserContext } from "../contexts/UserContext"
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import CustomDrawer from "../components/CustomDrawer"
import AddOffer from "../screens/offers/AddOffer";
import MyProfile from "../screens/profile/MyProfile";
import EditOffer from "../screens/offers/EditOffer";
import OfferDetails from "../screens/offers/OfferDetails";

const Drawer = createDrawerNavigator();

export default function RootNavigator({ onAppReady }) {

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
            <Provider>
                <StatusBar style="light" />
                <NavigationContainer onReady={onAppReady}>
                    <Drawer.Navigator
                        initialRouteName="HomeStack"
                        screenOptions={({ navigation }) => ({
                            drawerPosition: "right",
                            drawerInactiveTintColor: "#fff",
                            drawerActiveBackgroundColor: "#feda47",
                            drawerActiveTintColor: "#172b6b",
                            drawerLabelStyle: { fontSize: 16, fontFamily: "poppins-medium", top: 2 },
                            headerRight: () =>
                                <TouchableHighlight underlayColor={"#8a8888"} style={{ marginHorizontal: 10, borderRadius: 16, padding: 4 }} onPress={() => navigation.toggleDrawer()}>
                                    <Feather name="menu" size={24} color="white" />
                                </TouchableHighlight>,
                            headerLeft: () => null,
                            headerTitleStyle: { color: "#fff", fontFamily: "poppins-bold" },
                            headerStyle: { backgroundColor: "#333" },
                            headerTintColor: "#fff",
                            animation: "none",
                            swipeEdgeWidth: 200
                        })}
                        drawerContent={props => <CustomDrawer {...props} />}
                    >
                        <Drawer.Screen
                            navigationKey={user ? 'user' : 'guest'}
                            name={"HomeStack"}
                            component={MainStack}
                            options={{
                                headerShown: false,
                                drawerItemStyle: { marginTop: 30 },
                                title: "Home",
                                drawerIcon: ({ focused }) => (
                                    <Entypo name="home" size={24} color={focused ? '#172b6b' : '#fff'} />
                                ),
                            }} />
                        {user ? (
                            <>
                                <Drawer.Screen
                                    name={"Add Offer"}
                                    component={AddOffer}
                                    options={{
                                        drawerIcon: ({ focused }) => (
                                            <Ionicons name="add-circle" size={24} color={focused ? '#172b6b' : '#fff'} />
                                        ),
                                        unmountOnBlur: true,
                                    }} />
                                <Drawer.Screen
                                    name={"My Profile"}
                                    component={MyProfile}
                                    options={({ navigation }) => ({
                                        headerStyle: { backgroundColor: "#feda47" },
                                        headerTitleStyle: { color: "#172b6b", fontFamily: "poppins-bold" },
                                        headerRight: () =>
                                            <TouchableHighlight underlayColor={"#e6d260"} style={{ marginHorizontal: 10, borderRadius: 16, padding: 4 }} onPress={() => navigation.toggleDrawer()}>
                                                <Feather name="menu" size={24} color="#172b6b" />
                                            </TouchableHighlight>,
                                        drawerIcon: ({ focused }) => (
                                            <Feather name="user" size={24} color={focused ? '#172b6b' : '#fff'} />
                                        )
                                    })}
                                    initialParams={{ fromOfferDetails: false }}
                                />
                                <Drawer.Screen
                                    name={"EditOffer"}
                                    component={EditOffer}
                                    options={{
                                        drawerItemStyle: { display: "none" },
                                        unmountOnBlur: true,
                                    }} />
                                <Drawer.Screen
                                    name={"OfferDetails"}
                                    component={OfferDetails}
                                    options={{
                                        drawerItemStyle: { display: "none" },
                                        unmountOnBlur: true,
                                    }} />
                            </>
                        ) :
                            <>
                                <Drawer.Screen
                                    name={"Log in"}
                                    component={AuthStack}
                                    options={{
                                        drawerItemStyle: { display: "none" },
                                        headerShown: false,
                                        unmountOnBlur: true,
                                    }} />
                            </>
                        }
                    </Drawer.Navigator>
                </NavigationContainer>
            </Provider>
        </UserContext.Provider>
    )
}
