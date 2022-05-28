import { View, StyleSheet, FlatList, TouchableHighlight, BackHandler } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useEffect } from 'react';
import ContentLoader from "react-native-easy-content-loader";


import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global'
import useFetch from '../../hooks/useFetch';
import OfferCard from '../../components/OfferCard';
import AppTextBold from '../../components/AppTextBold';
import DotMenu from '../../components/DotMenu';

export default function MyProfile({ route, navigation }) {
    // TODO: figure out what to do if errors
    // TODO: if offer is added or edited make this refresh or refetch or whatever

    const { data: offers, isPending: offersPending, error: offersError } = useFetch("http:/192.168.1.17:8000/api/offers/me");
    const { data: user, isPending: userPending, error: userError } = useFetch("http:/192.168.1.17:8000/api/users/me");

    const flatListRef = useRef();

    const isFocused = useIsFocused()

    const { fromOfferDetails } = route.params;

    useEffect(() => {
        if (!fromOfferDetails && flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
    }, [fromOfferDetails])

    /*useFocusEffect(
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
    )*/

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

    const Loader = () => (
        <View style={{ backgroundColor: "#feda47", flex: 1 }}>
            {isFocused ?
                <StatusBar style="dark" />
                : null}
            <View style={{ padding: 18, paddingHorizontal: 8 }}>
                <ContentLoader containerStyles={styles.userInnerContainer} titleStyles={{ height: 25, marginVertical: 8, }} primaryColor='#172b6b' pRows={1} pWidth={["75%"]} />
            </View>
            <View style={{ backgroundColor: "#333", flex: 1, paddingHorizontal: 8 }}>
                <ContentLoader containerStyles={{ marginVertical: 18 }} titleStyles={{ height: 25, width: "75%", marginVertical: 10, }} primaryColor='#DCDCDC' pRows={0} />
                <ContentLoader containerStyles={{ marginVertical: 8 }} primaryColor='#DCDCDC' pRows={2} listSize={5} />
            </View>
        </View>
    )

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
                        <TouchableHighlight underlayColor={"#8a8888"} onPress={() => navigation.navigate("OfferDetails", { id: item._id, fromMyProfile: true })} activeOpacity={0.4}>
                            <OfferCard>
                                <View style={styles.offersTitleContainer}>
                                    <AppTextBold style={styles.offersTitleText}>{item.title}</AppTextBold>
                                    <AppText style={styles.offersText}>{item.pay}€</AppText>
                                </View>
                                <View style={styles.offersDescriptionContainer}>
                                    <AppText style={{ ...styles.offersText, flexBasis: "75%" }}>{item.description.substring(0, 70)}</AppText>
                                    <DotMenu navigation={navigation} listItem={item} />
                                </View>
                            </OfferCard>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
        : <Loader />)
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
    }

})
