import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native'
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

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (fromMyProfile) {
                    navigation.navigate("My Profile");
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
        <ScrollView style={globalStyles.container}>
            <StatusBar style="light" />
            {offer ?
                <View>
                    <View style={styles.titleTextContainer}>
                        <AppTextBold style={globalStyles.titleText}>{offer.title}</AppTextBold>
                    </View>
                    <AppText style={globalStyles.text}>{offer.description}</AppText>
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
        borderBottomWidth: 1,
        borderBottomColor: "#172b6b"
    }
})
