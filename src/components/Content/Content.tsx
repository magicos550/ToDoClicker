import * as React from 'react';
import {Appbar, useTheme, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import Card from "./parts/Card";

const Content = () => {
    const {colors} = useTheme();

    return (
        <View style={[styles.view, {backgroundColor: colors.background}]}>
            <Card color={'#00E5FF'} title={'Вот такая вот у меня цель'} step={7} target={150} />
            <Card color={'#FFCA26'} title={'Вот такая вот у меня цель'} step={20} target={200} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        height: '100%',
        padding: 25
    }
})

export default Content;
