import React, {useEffect} from "react";
import {StyleSheet, StatusBar} from 'react-native';
import {useTheme} from "react-native-paper";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import Index from "./src/Index";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {createTable} from './src/db';

const App: React.FC = () => {
    useEffect(() => {
        createTable();
    }, [])
    const {colors} = useTheme();

    return (
        <SafeAreaProvider style={[styles.container, {backgroundColor: colors.background}]}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Index />
          </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
