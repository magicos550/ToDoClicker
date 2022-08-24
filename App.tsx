import React from "react";
import {StyleSheet, StatusBar} from 'react-native';
import {useTheme} from "react-native-paper";
/*import {StatusBar} from "expo-status-bar";*/
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import Index from "./src/Index";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const App: React.FC = () => {
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
