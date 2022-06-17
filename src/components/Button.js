import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';


export default function Button({ onPress, text }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.opacity}>
                <AppText style={styles.buttonText}>{text}</AppText>
            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 16,
        marginVertical: 16,
        marginBottom: 100,
        backgroundColor: "#333",
        width: "40%",
        alignSelf: "center"
    },
    buttonText: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        fontSize: 18
    },
    opacity: {
        borderRadius: 16,
        padding: 14,
    }
})