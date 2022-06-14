import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#feda47",
        padding: 18,
    },
    input: {
        backgroundColor: "#333",
        padding: 12,
        paddingBottom: 7,
        fontSize: 18,
        borderRadius: 6,
        color: "#fff",
        fontFamily: "poppins-medium",
        height: 48,
        marginBottom: 10,
        marginTop: 6,
    },
    formLabel: {
        fontSize: 20,
        color: "#172b6b",
    },
    formContainer: {
        flex: 1,
        padding: 50,
        paddingTop: 30,
        backgroundColor: '#feda47',
    },
    formErrorText: {
        fontSize: 14,
        height: 30,
        color: "#ed2121",
    },
    text: {
        fontSize: 16,
        color: "#172b6b"
    },
    titleText: {
        fontSize: 24,
        color: "#172b6b"
    },
});