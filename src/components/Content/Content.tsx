import * as React from 'react';
import {Appbar, useTheme, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from "react-native";
import Card from "./parts/Card";
import {db} from "../../db";
import {useEffect, useState} from "react";
import {addCard} from "../../store/slices/cardsSlice";
import {useDispatch, useSelector} from "react-redux";

interface iCardInfo {
    ID: number,
    Title: string,
    Step: number,
    Target: number,
    Color: string
}

interface iCardsState {
    cards : {
        [key:number] : iCardInfo
    }
}

const Content = () => {
    const {colors} = useTheme();
    const [items, setItems] = useState<iCardInfo[]>(null);
    const dispatch = useDispatch();
    const cards = useSelector((state:iCardsState) => state.cards)

    useEffect(() => {
        db.transaction((tx) => {
            //tx.executeSql("insert into todos (title, target, score, step, color) values (?, ?, ?, ?, ?)", ['TEST' , 200, 0, 10, '#00E5FF']);
            //tx.executeSql("delete from todos");
            tx.executeSql(
                `SELECT * FROM todos`,
                [],
                (_, { rows: { _array } }) => {
                    setItems(_array)
                    dispatch(addCard(_array));
                }
            )
        })
    }, [])

    return (
        <View>
            <ScrollView contentContainerStyle={styles.view} style={{backgroundColor: colors.background, height: '100%'}}>
                {cards && Object.keys(cards).length !== 0 ? Object.keys(cards).map((item) => (
                    <Card key={cards[item].ID} id={cards[item].ID} color={cards[item].Color} title={cards[item].Title} step={cards[item].Step} target={cards[item].Target} />
                )) : <Text>EMPTY</Text>}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 50
    }
})

export default Content;
