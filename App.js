import 'react-native-gesture-handler';
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({ "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf") });
                await Font.loadAsync({ "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf") });
                await NavigationBar.setBackgroundColorAsync("#333");
                await NavigationBar.setButtonStyleAsync("light");
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);



    const onReady = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    {
        return (appIsReady ?
            <RootNavigator onAppReady={onReady} />
            : null)
    }

}
