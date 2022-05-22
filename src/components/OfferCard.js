import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function OfferCard(props) {
    return (
        <View style={styles.innerCardContainer}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    innerCardContainer: {
        padding: 18,
        paddingVertical: 10,
        paddingBottom: 16
    }
})