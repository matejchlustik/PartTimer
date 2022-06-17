import { useCallback } from 'react';
import { View, StyleSheet, ScrollView, BackHandler, ActivityIndicator } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';

import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import { globalStyles } from '../../styles/Global';
import useFetch from '../../hooks/useFetch';

export default function OfferDetails({ route, navigation }) {

    const { id, fromMyProfile } = route.params;

    const { data: offer, isPending: offerPending, error: offerError, refetch } = useFetch(`https://api-part-timer.herokuapp.com/api/offers/${id}`);

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
        <View style={[offer ? globalStyles.container : globalStyles.loadingContainer]}>
            <StatusBar style="light" />
            {!offerPending && !offerError ?
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
                offerError ?
                    <TouchableWithoutFeedback onPress={() => { refetch({}); }} >
                        <View style={globalStyles.loadingContainer}>
                            <AppTextBold style={globalStyles.text}>Something went wrong please tap anywhere to try again</AppTextBold>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <View style={globalStyles.loadingContainer}>
                        <ActivityIndicator size="large" color="#172b6b" />
                    </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    titleTextContainer: {
        paddingBottom: 8,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#172b6b"
    }
})
