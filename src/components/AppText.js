import { Text } from 'react-native'

export default function AppText(props) {
    return (
        <Text style={{ fontFamily: "poppins-medium", ...props.style }}>
            {props.children}
        </Text>
    )
}