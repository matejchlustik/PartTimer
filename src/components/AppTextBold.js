import { Text } from 'react-native'

export default function AppTextBold(props) {
    return (
        <Text style={{ fontFamily: "poppins-bold", ...props.style }}>
            {props.children}
        </Text>
    )
}