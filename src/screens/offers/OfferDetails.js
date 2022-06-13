import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, BackHandler, ActivityIndicator } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';

import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import { globalStyles } from '../../styles/Global'

export default function OfferDetails({ route, navigation }) {

    const { id, fromMyProfile } = route.params;

    const [offer, setOffer] = useState();

    useEffect(() => {
        const controller = new AbortController();
        async function fetchOffer() {
            try {
                const res = await fetch(`https://api-part-timer.herokuapp.com/api/offers/${id}`,
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

    useFocusEffect(
        useCallback(() => {
            navigation.closeDrawer();
            const onBackPress = () => {
                if (fromMyProfile) {
                    navigation.navigate("My Profile", { fromOfferDetails: true });
                    return true;
                } else {
                    return false;
                }
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [fromMyProfile])
    )

    return (
        <View style={[offer ? globalStyles.container : styles.loadingContainer]}>
            <StatusBar style="light" />
            {offer ?
                <ScrollView>
                    <View>
                        <View style={styles.titleTextContainer}>
                            <AppTextBold style={globalStyles.titleText}>{offer.title}</AppTextBold>
                            <AppText style={globalStyles.text}>{offer.pay}€</AppText>
                        </View>
                        <AppText style={globalStyles.text}>{offer.description}</AppText>
                    </View>
                </ScrollView>
                :
                <ActivityIndicator size="large" color="#172b6b" />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    titleTextContainer: {
        paddingBottom: 8,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#172b6b"
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#feda47",
    }
})
