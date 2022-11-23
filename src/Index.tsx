import React from "react";
import {MD3DarkTheme, Provider as PaperProvider} from "react-native-paper";
import BottomNav from "./components/Content/parts/BottomNav";
import Content from "./components/Content/Content";
import {Provider as ReduxProvider} from "react-redux";
import {store} from './store/index'


const theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
    },
    //fonts: configureFonts(fontConfig),
};



const Index: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <PaperProvider theme={theme}>
                <Content />
                <BottomNav />
            </PaperProvider>
        </ReduxProvider>

    );
}

export default Index;
