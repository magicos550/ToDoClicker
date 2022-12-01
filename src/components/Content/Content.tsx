import * as React from 'react';
import {useTheme, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from "react-native";
import Card from "./parts/Card";
import {db} from "../../db";
import {useEffect, useMemo} from "react";
import {addCard} from "../../store/slices/cardsSlice";
import {useDispatch, useSelector} from "react-redux";

interface iCardInfo {
    ID: number,
    title: string,
    score: number,
    step: number,
    target: number,
    color: string
}

interface iCardsState {
    cards : {
        [key:number] : iCardInfo
    }
}

const Content = () => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const cards = useSelector((state:iCardsState) => state.cards)

    const cardsList = () => useMemo((): JSX.Element => {
      return (
        <ScrollView contentContainerStyle={styles.view} style={{backgroundColor: colors.background, height: '100%'}}>
            {cards && Object.keys(cards).length !== 0 ? Object.keys(cards).map((item) => (
              <Card key={cards[item].ID} cardInfo={cards[item]} />
            )) : false}
        </ScrollView>
      )
    } , [cards])

    useEffect(() => {
        db.transaction((tx) => {
            //tx.executeSql("delete from todos");
            tx.executeSql(
                `SELECT * FROM todos`,
                [],
                (_, { rows: { _array } }) => {
                    dispatch(addCard(_array));
                }
            )
        })
    }, [])

    return (
        <View>
            {cardsList()}
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 50,
    }
})

export default Content;
