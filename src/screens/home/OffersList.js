import { useCallback } from 'react'
import { View, FlatList, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';

import AppText from '../../components/AppText';
import AppTextBold from '../../components/AppTextBold';
import OfferCard from '../../components/OfferCard';
import { globalStyles } from '../../styles/Global';
import useFetch from '../../hooks/useFetch';

export default function OffersList({ route, navigation }) {

    const { searchQuery } = route.params;
    const { data: offers, isPending: offersPending, error: offersError, refetch } = useFetch(`https://api-part-timer.herokuapp.com/api/offers/search/${searchQuery}`);

    useFocusEffect(
        useCallback(() => {
            navigation.closeDrawer();
        }, [])
    )

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
            {!offersPending && !offersError ?
                <FlatList
                    data={offers}
                    renderItem={renderItem}
                    keyExtractor={item => item._id} />
                :
                offersError ?
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
    },

})

