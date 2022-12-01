import React, {useEffect} from "react";
import {StyleSheet, SafeAreaView, StatusBar, Text} from 'react-native';
import {MD3DarkTheme, Provider as PaperProvider, useTheme} from "react-native-paper";
import Index from "./src/Index";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {createTable} from './src/db';
import {Provider as ReduxProvider} from "react-redux";
import {store} from './src/store'

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
  //fonts: configureFonts(fontConfig),
};

const App: React.FC = () => {
    useEffect(() => {
        createTable();
    }, [])

    return (
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Index />
            </GestureHandlerRootView>
          </SafeAreaView>
        </PaperProvider>
      </ReduxProvider>


    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});
