import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { useContext } from 'react'
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import AppText from './AppText'
import { UserContext } from "../contexts/UserContext"


export default function CustomDrawer(props) {
    const { user, setUser } = useContext(UserContext);

    const userOnPress = async () => {
        await SecureStore.deleteItemAsync("token");
        setUser(null);
        props.navigation.closeDrawer();
        props.navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: "HomeStack" }] }));
    }

    const nonUserOnPress = () => { props.navigation.navigate("Log in") }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScrollView}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.bottomBar}>
                {user ?
                    <TouchableHighlight style={styles.bottomBarTouchOpacity} onPress={userOnPress} underlayColor={"#222"}>
                        <View style={styles.bottomBarContainer}>
                            <Entypo name="login" size={24} color="#fff" style={styles.bottomBarIcon} />
                            <AppText style={styles.bottomBarText}>Log out</AppText>
                        </View>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight style={styles.bottomBarTouchOpacity} onPress={nonUserOnPress} underlayColor={"#222"}>
                        <View style={styles.bottomBarContainer}>
                            <Entypo name="log-out" size={24} color="#fff" style={styles.bottomBarIcon} />
                            <AppText style={styles.bottomBarText}>Log in</AppText>
                        </View>
                    </TouchableHighlight>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerScrollView: {
        backgroundColor: "#333",
        flex: 1
    },
    bottomBar: {
        backgroundColor: "#333",
        borderTopWidth: 1,
        borderTopColor: "#fff"
    },
    bottomBarText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "poppins-medium",
        top: 2
    },
    bottomBarTouchOpacity: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        margin: 10,
        borderRadius: 4
    },
    bottomBarContainer: {
        display: "flex",
        flexDirection: "row"
    },
    bottomBarIcon: {
        marginRight: 32
    }
})