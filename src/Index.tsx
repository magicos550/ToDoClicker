import React from "react";
import {StyleSheet, StatusBar} from 'react-native';
import {configureFonts, MD3DarkTheme, Provider as PaperProvider} from "react-native-paper";
import BottomNav from "./components/BottomNav";
import Content from "./components/Content/Content";
import {SafeAreaView} from "react-native-safe-area-context";

const theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
    },
    //fonts: configureFonts(fontConfig),
};

const Index: React.FC = () => {
    return (
        <PaperProvider theme={theme}>
            <SafeAreaView>
                <Content />
                <BottomNav />
            </SafeAreaView>
        </PaperProvider>
    );
}

export default Index;
