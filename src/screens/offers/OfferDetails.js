import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'

import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global'

export default function OfferDetails({ route, navigation }) {

    const { id } = route.params;

    const [offer, setOffer] = useState();

    useEffect(() => {
        const controller = new AbortController();
        async function fetchOffer() {
            try {
                const res = await fetch(`http:/192.168.1.14:8000/api/offers/${id}`,
                    {
                        method: "GET",
                        signal: controller.signal
                    });
                if (!res.ok) {
                    throw new Error("Failed to fetch the data");
                }
                setOffer(await res.json());
            } catch (error) {
                console.log(error);
            }
        }
        fetchOffer();
        return () => controller.abort();
    }, [id])


    return (
        <ScrollView style={globalStyles.container}>
            {offer ?
                <View>
                    <View style={styles.titleTextContainer}>
                        <AppText style={styles.titleText}>{offer.title}</AppText>
                    </View>
                    <AppText>{offer.description}</AppText>
                </View>
                : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffea63",
        padding: 18,
    },
    titleTextContainer: {
        paddingBottom: 8,
        marginBottom: 20,
        borderBottomWidth: 1
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
    }
})