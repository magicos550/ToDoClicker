import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Button, MD3Colors, Portal, Text} from 'react-native-paper';
import {Keyboard, StyleSheet, TouchableOpacity, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {useDispatch} from "react-redux";
import {db} from "../../../db";
import {removeCard} from "../../../store/slices/cardsSlice";
import BottomSheet, {useBottomSheet} from "@gorhom/bottom-sheet";
import AddForm from "./AddForm";

interface iCardConfig {
    id: number
    color: string,
    title: string,
    score: number,
    step: number,
    target: number
}

const Card = (props: iCardConfig) => {
    const dispatch = useDispatch();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['100%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        Keyboard.dismiss();
    }, []);

    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            borderColor: props.color,
            padding: 15,
            borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,.1)',
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

    let [score , setScore] = useState(props.score);

    const percent = (score / props.target) * 100;

    const addScore = async () => {
        await db.transaction((tx) => {
            tx.executeSql(
                `update todos set score=? where ID=?`,
                [score + props.step, props.id],
                (transaction, result) => {
                    setScore(score += props.step)
                }
            )
        });
    }

    const complete = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `delete from todos where ID=${props.id}`,
                null,
                (transaction, result) => {
                    dispatch(removeCard(props.id))
                }
            )
        });
    }

    const intToString = (num: number) => {
        const numString: string = num.toString();

        numString.replace(/[^0-9.]/g, '');

        if (num < 1000) {
            return num.toString();
        }

        let si = [
            {v: 1E3, s: "K"},
            {v: 1E6, s: "M"},
            {v: 1E9, s: "B"},
            {v: 1E12, s: "T"},
            {v: 1E15, s: "P"},
            {v: 1E18, s: "E"}
        ];
        let index;

        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
    }


    return (
        <TouchableOpacity style={styles.card} onPress={() => bottomSheetRef.current.snapToIndex(0)}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <View style={styles.cardInner}>
                <View style={styles.cardProgress}>
                    <AnimatedCircularProgress
                        size={130}
                        width={17}
                        fill={percent < 100 ? percent : 100}
                        rotation={0}
                        tintColor={props.color}
                        style={{marginRight: 0, paddingRight: 0}}
                        onAnimationComplete={() => score >= props.target ? complete() : false}
                        backgroundColor={props.color + '33'}>
                        {fill => <Text style={styles.circleText}>{parseInt(fill.toString())}%</Text>}
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.cardInfo}>
                    <View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>Счетчик:</Text>
                            <Text style={styles.text}>{props.target >= score ? intToString(score) + '/' + intToString(props.target) : intToString(props.target)}</Text>
                        </View>
                        <View style={[styles.textWrapper, {marginTop: 10}]}>
                            <Text style={styles.text}>Осталось:</Text>
                            <Text style={styles.text}>{props.target > score ? intToString(props.target - score) : 'OK'}</Text>
                        </View>
                    </View>

                    <Button mode="contained" labelStyle={{fontSize: 16, fontWeight: 'bold'}} textColor={MD3Colors.neutral100} onPress={() => addScore()} style={styles.cardButton}>
                        + {intToString(props.step)}
                    </Button>
                </View>
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

                    <AddForm cardInfo={{title: props.title, step: props.step, target: props.target, color: props.color}} cardId={props.id}/>
                </BottomSheet>
            </Portal>
        </TouchableOpacity>
    )
};



export default Card;
