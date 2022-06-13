import { View, StyleSheet, FlatList, TouchableHighlight, BackHandler, RefreshControl, ActivityIndicator } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useEffect, useState } from 'react';

import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global'
import useFetch from '../../hooks/useFetch';
import OfferCard from '../../components/OfferCard';
import AppTextBold from '../../components/AppTextBold';
import DotMenu from '../../components/DotMenu';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function MyProfile({ route, navigation }) {
    // TODO: figure out what to do if errors

    const { data: offers, setData: setOffers, isPending: offersPending, error: offersError, refetch } = useFetch("https://api-part-timer.herokuapp.com/api/offers/me");
    const { data: user, isPending: userPending, error: userError } = useFetch("https://api-part-timer.herokuapp.com/api/users/me");
    const [refreshing, setRefreshing] = useState(false);

    const flatListRef = useRef();

    const isFocused = useIsFocused()

    const { fromOfferDetails } = route.params;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch({});
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        if (!fromOfferDetails && flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
    }, [fromOfferDetails])

    useFocusEffect(
        useCallback(() => {
            navigation.closeDrawer();
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
            <AppTextBold style={{ ...styles.offersTitleText, ...styles.offersHeader }}>Active Offers</AppTextBold>
        </View>
    )

    const removeOffer = (offerID) => {
        setOffers(offers.filter(e => e._id !== offerID));
    }

    return (!offersPending && !userPending ?
        <View style={{ flex: 1, backgroundColor: "#feda47" }}>
            {isFocused ?
                <StatusBar style="dark" />
                : null}
            <View style={styles.offersContainer}>
                <FlatList
                    ref={flatListRef}
                    ListHeaderComponent={ListHeaderComponent}
                    data={offers}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            underlayColor={"#8a8888"}
                            onPress={() => navigation.navigate("OfferDetails", { id: item._id, fromMyProfile: true })}
                            activeOpacity={0.4}
                        >
                            <OfferCard>
                                <View style={styles.offersTitleContainer}>
                                    <AppTextBold style={styles.offersTitleText}>{item.title}</AppTextBold>
                                    <AppText style={styles.offersText}>{item.pay}€</AppText>
                                </View>
                                <View style={styles.offersDescriptionContainer}>
                                    <AppText style={{ ...styles.offersText, flexBasis: "75%" }}>{item.description.substring(0, 70)}</AppText>
                                    <DotMenu navigation={navigation} listItem={item} removeOffer={removeOffer} />
                                </View>
                            </OfferCard>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </View>
        :
        <View style={styles.loadingContainer}>
            {isFocused ?
                <StatusBar style="dark" />
                : null}
            <ActivityIndicator size="large" color="#172b6b" />
        </View>)
}

const styles = StyleSheet.create({
    userInnerContainer: {
        paddingBottom: 8,
        marginVertical: 16,
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
        flexBasis: "75%"
    },
    offersText: {
        fontSize: 16,
        color: "#fff",
    },
    offersHeader: {
        paddingHorizontal: 18,
        marginVertical: 18,
        fontSize: 24
    },
    offersTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    offersDescriptionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#feda47",
    }

})
