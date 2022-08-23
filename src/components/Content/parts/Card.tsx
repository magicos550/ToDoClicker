import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface iCardConfig {
    color: string,
    title: string,
    step: number,
    target: number
}

const Card = (props: iCardConfig) => {
    const styles = StyleSheet.create({
        card: {
            borderWidth: 2,
            borderColor: props.color,
            padding: 20,
            borderRadius: 20,
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
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        cardInfo: {
            marginLeft: 20
        },
        cardButton: {
            marginTop: 40
        },
        cardProgress: {
            flexGrow: 1
        }
    })

    let [score , setScore] = useState(0);

    const percent = (score / props.target) * 100;

    return (
        <View style={styles.card}>
            <Text style={{fontSize: 20}}>{props.title}</Text>
            <View style={styles.cardInner}>
                <View style={styles.cardProgress}>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={percent < 100 ? percent : 100}
                        rotation={0}
                        tintColor={props.color}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                        {fill => <Text style={styles.circleText}>{parseInt(fill.toString())}%</Text>}
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={{fontSize: 14}}>Счетчик: {props.target >= score ? score + '/' + props.target : props.target}</Text>
                    <Text>Осталось: {props.target > score ? props.target - score : 'OK'}</Text>
                    <Button mode="outlined" color={props.color} onPress={() => setScore(score += props.step)} style={styles.cardButton}>
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
