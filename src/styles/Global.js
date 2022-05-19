import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffea63",
        padding: 18,
    },
    input: {
        backgroundColor: "#333",
        padding: 12,
        paddingBottom: 7,
        fontSize: 18,
        borderRadius: 6,
        color: "#fff",
        fontFamily: "poppins-regular",
        height: 48,
        marginBottom: 10,
        marginTop: 6,
    },
    formLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2e2e2e",
    },
    formContainer: {
        flex: 1,
        padding: 50,
        paddingTop: 30,
        backgroundColor: '#ffea63',
    },
    formErrorText: {
        fontSize: 14,
        height: 30,
        color: "#ed2121",
        fontWeight: "bold"
    }
});