import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';

import RootNavigator from './src/navigation/RootNavigator';

const loadAssets = async () => {
    await Font.loadAsync({ "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf") });
    await Font.loadAsync({ "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf") });
    await NavigationBar.setBackgroundColorAsync("#333");
    await NavigationBar.setButtonStyleAsync("light");
}


export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {
        return (
            <RootNavigator />
        );
    } else {
        return (
            <AppLoading
                startAsync={loadAssets}
                onFinish={() => setFontsLoaded(true)}
                onError={(err) => console.log(err)}
            />
        )
    }
}


