import { useState, useEffect } from "react"
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

import { UserContext } from "../contexts/UserContext"
import TestScreen from "../screens/TestScreen";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import CustomDrawer from "../components/CustomDrawer"
import { StatusBar } from "expo-status-bar";
import AddOffer from "../screens/offers/AddOffer";


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
                        drawerActiveBackgroundColor: "#ffea63",
                        drawerActiveTintColor: "#2e2e2e",
                        drawerLabelStyle: { fontSize: 16, fontFamily: "poppins-regular", top: 2 },
                        headerRight: () => <View style={{ marginHorizontal: 15 }}><Feather name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /></View>,
                        headerLeft: () => null,
                        headerTitleStyle: { color: "#fff" },
                        headerStyle: { backgroundColor: "#333" },
                        headerTintColor: "#fff",
                        animation: "none",
                    })}
                    drawerContent={props => <CustomDrawer {...props} />}
                >
                    <Drawer.Screen navigationKey={user ? 'user' : 'guest'} name={"HomeStack"} component={MainStack} options={{ headerShown: false, drawerItemStyle: { marginTop: 30 } }} />
                    {user ? (
                        <>
                            <Drawer.Screen name={"AddOffer"} component={AddOffer} />
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