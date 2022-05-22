import { View, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useState } from 'react'
import { StatusBar } from "expo-status-bar";

import { getSearchOffers } from '../../api/OfferRequests';
import AppText from '../../components/AppText';
import { globalStyles } from '../../styles/Global'
import AppTextBold from '../../components/AppTextBold';


export default function Home({ navigation }) {

    const [searchOffers, setSearchOffers] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTimer, setSearchTimer] = useState(null);

    const fetchOffers = async value => {
        const data = await getSearchOffers(value);
        if (data.message) {
            console.log(data.message, "HomeScreen 13-27");
            setSearchOffers(null);
        } else {
            setSearchOffers(data);
        }
    }

    const onChangeText = value => {
        if (searchTimer) {
            clearTimeout(searchTimer)
        }
        setSearchQuery(value);
        if (value) {
            setSearchTimer(setTimeout(() => { fetchOffers(value); }, 500));
        } else {
            setSearchOffers(null);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("OfferDetails", { id: item._id })}>
            <View style={styles.searchResultContainer}>
                <AppText style={styles.searchResultText}>{item.title}</AppText>
            </View>
        </TouchableOpacity >
    )

    return (
        <View style={globalStyles.container}>
            <StatusBar style="light" />
            <View style={styles.innerContainer}>
                <AppTextBold style={{ ...globalStyles.titleText, ...styles.welcomeText }}>Welcome</AppTextBold>
                <SearchBar
                    placeholder='Search'
                    onChangeText={onChangeText}
                    value={searchQuery}
                    lightTheme={true}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                    inputStyle={styles.searchBarInput}
                    onSubmitEditing={() => navigation.navigate("OffersList", { searchQuery })}
                />
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    data={searchOffers}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchResultText: {
        fontSize: 18,
        color: "#fff"
    },
    searchResultContainer: {
        backgroundColor: "#333",
        padding: 12,
        paddingHorizontal: 20,
        paddingBottom: 8
    },
    innerContainer: {
        padding: 20,
    },
    searchBarContainer: {
        backgroundColor: "transparent",
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        paddingHorizontal: 0,
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    searchBarInputContainer: {
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        backgroundColor: "#333",
    },
    searchBarInput: {
        color: "#fff",
        fontFamily: "poppins-medium",
        top: 2
    },
    welcomeText: {
        padding: 10,
        textAlign: "center"
    }

});