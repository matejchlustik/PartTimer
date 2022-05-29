import { TouchableHighlight, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { useState } from 'react';

import { deleteOffer } from '../api/OfferRequests';

export default function DotMenu({ navigation, listItem, removeOffer }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <TouchableHighlight style={{ borderRadius: 16, padding: 4 }} underlayColor={"#8a8888"} activeOpacity={0.4} onPress={openMenu}>
                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                </TouchableHighlight>
            }
        >
            <Menu.Item
                onPress={() => {
                    closeMenu();
                    navigation.navigate("EditOffer", listItem);
                }}
                title="Edit" />
            <Menu.Item
                onPress={() => {
                    closeMenu();
                    Alert.alert(
                        "Delete",
                        `Do you want to delete ${listItem.title} ?`,
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                            },
                            {
                                text: "Confirm",
                                onPress: async () => {
                                    removeOffer(listItem._id);
                                    const data = await deleteOffer(listItem._id);
                                    console.log(data);
                                }
                            }
                        ]
                    )
                }}
                title="Delete" />
        </Menu>
    )
}
