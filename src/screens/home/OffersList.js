import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import { getSearchOffers } from '../../api/OfferRequests';
import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global'

export default function OffersList({ route, navigation }) {

    const [offers, setOffers] = useState();
    const { searchQuery } = route.params;

    useEffect(() => {
        const controller = new AbortController();
        async function fetchOffer() {
            const data = await getSearchOffers(searchQuery);
            if (data.message) {
                console.log(data.message, "OffersListScreen 11-24");
                setOffers(null);
            } else {
                setOffers(data);
            }
        }
        fetchOffer();
        return () => controller.abort();
    }, [searchQuery])

    //TODO: style this better

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("OfferDetails", { id: item._id })} style={styles.offerCardContainer}>
            <View style={styles.offerCard}>
                <AppText>{item.title}</AppText>
                <AppText>{item.company}</AppText>
                <AppText>{item.pay}</AppText>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={globalStyles.container}>
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
    offerCard: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    offerCardContainer: {
        backgroundColor: "#f6b30a",
        borderRadius: 12,
        marginHorizontal: 18,
        marginVertical: 10,
        shadowColor: "black",
        elevation: 8,
    }
})

