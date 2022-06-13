import { useEffect, useState, useCallback } from 'react'
import { View, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';

import { getSearchOffers } from '../../api/OfferRequests';
import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import OfferCard from '../../components/OfferCard';
import { globalStyles } from '../../styles/Global'

export default function OffersList({ route, navigation }) {

    const [offers, setOffers] = useState();
    const { searchQuery } = route.params;

    useFocusEffect(
        useCallback(() => {
            navigation.closeDrawer();
        }, [])
    )

    useEffect(() => {
        const controller = new AbortController();
        async function fetchOffers() {
            const data = await getSearchOffers(searchQuery);
            if (data.message) {
                console.log(data.message, "OffersListScreen 11-24");
                setOffers(null);
            } else {
                setOffers(data);
            }
        }
        fetchOffers();
        return () => controller.abort();
    }, [searchQuery])


    const renderItem = ({ item }) => (
        <TouchableHighlight underlayColor={"#e6d260"} onPress={() => navigation.navigate("OfferDetails", { id: item._id })} activeOpacity={0.4}>
            <OfferCard>
                <View style={styles.offersTitleContainer}>
                    <AppTextBold style={styles.offersTitleText}>{item.title}</AppTextBold>
                    <AppText style={globalStyles.text}>{item.pay}$</AppText>
                </View>
                <AppText style={globalStyles.text}>{item.description.substring(0, 70)}</AppText>
            </OfferCard>
        </TouchableHighlight>
    )

    return (
        <View style={styles.offersContainer}>
            <StatusBar style="light" />
            {offers ?
                <FlatList
                    data={offers}
                    renderItem={renderItem}
                    keyExtractor={item => item._id} />
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    offersContainer: {
        flex: 1,
        backgroundColor: "#feda47"
    },
    offersTitleText: {
        fontSize: 18,
        color: "#172b6b",
        flexBasis: "75%"
    },
    offersTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginVertical: 10
    }
})

