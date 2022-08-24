import React, {useState} from 'react';
import {Button, MD3Colors, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {green} from "react-native-reanimated/lib/types/lib";

interface iCardConfig {
    color: string,
    title: string,
    step: number,
    target: number
}

const Card = (props: iCardConfig) => {

    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            borderColor: props.color,
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,.1)',
            position: "relative",
            marginBottom: 20
        },
        absolute: {
            position: 'absolute',
        },
        circleText: {
            fontSize: 24,
            fontWeight: 'bold'
        },
        cardInner: {
            height: 120,
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
        },
        cardButton: {
            backgroundColor: MD3Colors.neutral40,
            borderRadius: 10,
            width: 80,
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
            fontSize: 14,
            lineHeight: 14
        }
    })

    let [score , setScore] = useState(0);

    const percent = (score / props.target) * 100;

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <View style={styles.cardInner}>
                <View style={styles.cardProgress}>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={percent < 100 ? percent : 100}
                        rotation={0}
                        tintColor={props.color}
                        style={{marginRight: 0, paddingRight: 0}}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={props.color + '33'}>
                        {fill => <Text style={styles.circleText}>{parseInt(fill.toString())}%</Text>}
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.cardInfo}>
                    <View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>Счетчик:</Text>
                            <Text style={styles.text}>{props.target >= score ? score + '/' + props.target : props.target}</Text>
                        </View>
                        <View style={[styles.textWrapper, {marginTop: 10}]}>
                            <Text style={styles.text}>Осталось:</Text>
                            <Text style={styles.text}>{props.target > score ? props.target - score : 'OK'}</Text>
                        </View>
                    </View>

                    <Button mode="contained" labelStyle={{fontSize: 16, fontWeight: 'bold'}} textColor={MD3Colors.neutral100} onPress={() => setScore(score += props.step)} style={styles.cardButton}>
                        + {props.step}
                    </Button>
                </View>
            </View>
            {/*<Button mode="outlined" color={props.color} onPress={() => setScore(0)} style={styles.cardButton}>
                Сброс
            </Button>*/}
        </View>
    )
};



export default Card;
