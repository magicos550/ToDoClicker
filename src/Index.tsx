import {MD3DarkTheme, Provider as PaperProvider, Text} from "react-native-paper";
import BottomNav from "./components/Content/parts/BottomNav";
import Content from "./components/Content/Content";



const theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
    },
    //fonts: configureFonts(fontConfig),
};



const Index: React.FC = () => {
    return (
        /*<ReduxProvider store={store}>

        </ReduxProvider>*/
        <>
          <Content />
          <BottomNav />
        </>
    );
}

export default Index;
