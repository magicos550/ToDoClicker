import React, {useEffect} from "react";
import {StyleSheet, SafeAreaView} from 'react-native';
import {useTheme} from "react-native-paper";
import Index from "./src/Index";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {createTable} from './src/db';

const App: React.FC = () => {
    useEffect(() => {
        createTable();
    }, [])
    const {colors} = useTheme();

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Index />
        </GestureHandlerRootView>
      </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
