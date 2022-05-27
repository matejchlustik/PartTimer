import { View, StyleSheet, FlatList, TouchableHighlight, BackHandler } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useEffect } from 'react';

import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global'
import useFetch from '../../hooks/useFetch';
import OfferCard from '../../components/OfferCard';
import AppTextBold from '../../components/AppTextBold';

export default function MyProfile({ route, navigation }) {
    // TODO: figure out what to do if errors

    const { data: offers, isPending: offersPending, error: offersError } = useFetch("http:/192.168.1.14:8000/api/offers/me");
    const { data: user, isPending: userPending, error: userError } = useFetch("http:/192.168.1.14:8000/api/users/me");

    const flatListRef = useRef();

    const isFocused = useIsFocused()

    const { fromOfferDetails } = route.params;

    useEffect(() => {
        if (!fromOfferDetails && flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
    }, [fromOfferDetails])

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.navigate("Home");
                return true;
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            const cleanup = () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
                navigation.setParams({
                    fromOfferDetails: false
                });
            }
            return () => cleanup();
        }, [])
    )

    const ListHeaderComponent = () => (
        <View>
            <View style={styles.userContainer}>
                <View style={styles.userInnerContainer}>
                    <AppTextBold style={{ ...globalStyles.titleText, marginVertical: 8, }}>{user.name}</AppTextBold>
                    <AppText style={globalStyles.text}>{user.email}</AppText>
                </View>
            </View>
            <AppTextBold style={{ ...styles.offersTitleText, paddingHorizontal: 18, marginVertical: 18, fontSize: 24 }}>Active Offers</AppTextBold>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: "#feda47" }}>
            {isFocused ?
                <StatusBar style="dark" />
                : null}
            <View style={styles.offersContainer}>
                {offers && user ?
                    <FlatList
                        ref={flatListRef}
                        ListHeaderComponent={ListHeaderComponent}
                        data={offers}
                        renderItem={({ item }) => (
                            <TouchableHighlight underlayColor={"#8a8888"} onPress={() => navigation.navigate("OfferDetails", { id: item._id, fromMyProfile: true })} activeOpacity={0.4}>
                                <OfferCard>
                                    <View style={styles.offersTitleContainer}>
                                        <AppTextBold style={styles.offersTitleText}>{item.title}</AppTextBold>
                                        <AppText style={styles.offersText}>{item.pay}$</AppText>
                                    </View>
                                    <AppText style={styles.offersText}>{item.description.substring(0, 30)}</AppText>
                                </OfferCard>
                            </TouchableHighlight>
                        )}
                        keyExtractor={item => item._id}
                    />
                    : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInnerContainer: {
        paddingBottom: 8,
        marginVertical: 20,
    },
    userContainer: {
        padding: 18,
        backgroundColor: "#feda47"
    },
    offersContainer: {
        flex: 1,
        backgroundColor: "#333",
    },
    offersTitleText: {
        fontSize: 18,
        color: "#fff",
    },
    offersText: {
        fontSize: 16,
        color: "#fff",
    },
    offersTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginVertical: 10
    },
})