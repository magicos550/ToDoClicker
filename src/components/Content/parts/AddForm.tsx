import * as React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {Divider, IconButton, MD3Colors, Text, TextInput} from 'react-native-paper';
import {colorsList} from "../../../colorsConfig";
import ColorPicker from "./ColorPicker";
import {useBottomSheet} from "@gorhom/bottom-sheet";
import {db} from "../../../db";
import {addCard} from "../../../store/slices/cardsSlice";
import {useDispatch} from "react-redux";

interface iToDo {
    title: string | null,
    target: number | null,
    step: number | null,
    color: string | null
}

const initialState = {
    title: null,
    target: null,
    step: null,
    color: null
}

const AddForm = (props) => {
    const [info, setInfo] = React.useState<iToDo>(initialState);
    const dispatch = useDispatch();

    const { close } = useBottomSheet();

    const updateColor = (color: string) => {
        setInfo({...info , color: color})
    }

    const addNewCard = () => {
        const newCard = {

        }

        db.transaction((tx) => {
            tx.executeSql(
                `insert into todos (title, target, score, step, color) values (?, ?, ?, ?, ?)`,
                [info.title , info.target, 0, info.step, info.color],
                (transaction, result) => {
                    dispatch(addCard(
                        [
                            {
                                "ID": result.insertId,
                                "Title": info.title,
                                "Target": info.target,
                                "Score": 0,
                                "Step": info.step,
                                "Color": info.color
                            }
                        ]
                    ));
                }
            )
        });
        //
        setInfo(initialState);
        close();
    }


    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 5,
        },
        wrapper: {
            paddingHorizontal: 10
        },
        header: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        content: {
            paddingTop: StatusBar.currentHeight
        },
        textInput: {
            backgroundColor: '#323232',
            marginBottom: 20,
            marginTop: 0
        },
        textInputSmall: {
            width: 150,
        },
        label: {
            fontSize: 18
        },
        divider: {
            backgroundColor: '#030303',
            marginBottom: 10,
            marginTop: 5
        },
        inputSet: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10
        }
    });

    return (
        <ScrollView style={[styles.container, styles.wrapper]}>
            <View style={styles.header}>
                <IconButton
                    mode='contained'
                    containerColor={MD3Colors.neutral20}
                    icon="close"
                    iconColor={MD3Colors.error50}
                    size={27}
                    onPress={() => close()}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Добавить новую цель</Text>
                <IconButton
                    mode='contained'
                    containerColor={MD3Colors.neutral20}
                    icon="plus"
                    iconColor='#9ebd79'
                    size={27}
                    onPress={() => info.color ? addNewCard() : false}
                />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.container}>
                <Text style={styles.label}>Название цели</Text>
                <TextInput
                    mode='outlined'
                    //label="Название цели"
                    value={info.title}
                    style={styles.textInput}
                    outlineColor='transparent'
                    activeOutlineColor='#484848'
                    selectionColor={info.color}
                    numberOfLines={1}
                    multiline={false}
                    onChangeText={val => setInfo({...info, title: val})}
                />
                <View style={styles.inputSet}>
                    <View>
                        <Text style={styles.label}>Количество</Text>
                        <TextInput
                            mode='outlined'
                            outlineColor='transparent'
                            activeOutlineColor='#484848'
                            style={[styles.textInputSmall , styles.textInput]}
                            //label="Количество"
                            keyboardType={'numeric'}
                            value={info.target ? info.target.toString() : ''}
                            selectionColor={info.color}
                            onChangeText={val => setInfo({...info, target: parseInt(val.replace(/[^0-9]/g, ''))})}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Шаг</Text>
                        <TextInput
                            mode='outlined'
                            outlineColor='transparent'
                            activeOutlineColor='#484848'
                            style={[styles.textInputSmall , styles.textInput]}
                            //label="Шаг"
                            keyboardType={'numeric'}
                            value={info.step ? info.step.toString() : ''}
                            selectionColor={info.color || '#ffffff'}
                            onChangeText={val => setInfo({...info, step: parseInt(val.replace(/[^0-9]/g, ''))})}
                        />
                    </View>
                </View>
            </View>

            <ColorPicker currentColor={info.color} updateColor={updateColor} colors={colorsList} />
        </ScrollView>
    );
};

export default AddForm;
