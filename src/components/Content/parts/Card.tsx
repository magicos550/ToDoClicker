import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Button, MD3Colors, Portal, Text} from 'react-native-paper';
import {Keyboard, StyleSheet, TouchableOpacity, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {useDispatch} from "react-redux";
import {db} from "../../../db";
import {removeCard} from "../../../store/slices/cardsSlice";
import BottomSheet from "@gorhom/bottom-sheet";
import AddForm from "./AddForm";
import useFormatNumbers from "../../../hooks/useFormatNumbers";

interface iCardInfo {
    cardInfo: iCardConfig
}

interface iCardConfig {
    ID: number
    color: string,
    title: string,
    score: number,
    step: number,
    target: number
}

const Card = ({cardInfo}: iCardInfo) => {
    const dispatch = useDispatch();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['100%'], []);

    const handleSheetChanges = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    let [score , setScore] = useState(cardInfo.score);

    const percent = (score / cardInfo.target) * 100;

    const addScore = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `update todos set score=? where ID=?`,
                [score + cardInfo.step, cardInfo.ID],
                async () => {
                    await setScore(score += cardInfo.step)
                }
            )
        });
    }

    const complete = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `delete from todos where ID=${cardInfo.ID}`,
                null,
                async () => {
                    await dispatch(removeCard(cardInfo.ID))
                }
            )
        });
    }

    return (
      <>
          <View>
              <TouchableOpacity style={[styles.card, {borderColor: cardInfo.color}]} onPress={() => bottomSheetRef.current.expand()}>
                  <Text style={styles.cardTitle}>{cardInfo.title}</Text>
                  <View style={styles.cardInner}>
                      <View style={styles.cardProgress}>
                          <AnimatedCircularProgress
                            size={130}
                            width={17}
                            fill={percent < 100 ? percent : 100}
                            rotation={0}
                            tintColor={cardInfo.color}
                            style={{marginRight: 0, paddingRight: 0}}
                            onAnimationComplete={() => score >= cardInfo.target ? complete() : false}
                            backgroundColor={cardInfo.color + '33'}>
                              {fill => <Text style={styles.circleText}>{parseInt(fill.toString())}%</Text>}
                          </AnimatedCircularProgress>
                      </View>
                      <View style={styles.cardInfo}>
                          <View>
                              <View style={styles.textWrapper}>
                                  <Text style={styles.text}>Сделано:</Text>
                                  <Text style={styles.text}>{useFormatNumbers(score)}</Text>
                              </View>
                              <View style={[styles.textWrapper, {marginTop: 10}]}>
                                  <Text style={styles.text}>Осталось:</Text>
                                  <Text style={styles.text}>{cardInfo.target > score ? useFormatNumbers(cardInfo.target - score) : 0}</Text>
                              </View>
                          </View>

                          <Button mode="contained" labelStyle={{fontSize: 16, fontWeight: 'bold'}} textColor={MD3Colors.neutral100} onPress={() => addScore()} style={styles.cardButton}>
                              + {useFormatNumbers(cardInfo.step)}
                          </Button>
                      </View>
                  </View>
              </TouchableOpacity>
          </View>

          <Portal>
              <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                enableHandlePanningGesture={false}
                backgroundStyle={{backgroundColor: '#282828'}}
              >

                  <AddForm cardInfo={{title: cardInfo.title, step: cardInfo.step, target: cardInfo.target, color: cardInfo.color}} cardId={cardInfo.ID}/>
              </BottomSheet>
          </Portal>
      </>
    )
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: MD3Colors.neutral20,
        position: "relative",
        marginBottom: 15
    },
    absolute: {
        position: 'absolute',
    },
    circleText: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    cardInner: {
        height: 130,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start"
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardInfo: {
        height: '100%',
        justifyContent: "space-between",
        flexGrow: 1,
        display: "flex"
    },
    cardButton: {
        backgroundColor: MD3Colors.neutral40,
        borderRadius: 10,
        width: '100%',
        alignSelf: "flex-end",
    },
    cardProgress: {
        width: '50%',
    },
    textWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    text: {
        fontSize: 17,
    }
})



export default Card;
