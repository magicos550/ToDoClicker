import * as React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {IconButton, MD3Colors, Text, TextInput} from 'react-native-paper';
import {colorsList} from "../../../colorsConfig";
import ColorPicker from "./ColorPicker";

interface iToDo {
    title: string | null,
    count: number | null,
    step: number | null
}

const AddForm = (props) => {
    const [info, setInfo] = React.useState<iToDo>({
        title: null,
        count: null,
        step: null
    });


    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 5,
        },
        header: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        content: {
            paddingTop: StatusBar.currentHeight
        },
        textInput: {
            width: 150
        }
    });

    return (
        <ScrollView style={styles.container}>

            <View style={styles.container}>
                <TextInput
                    label="Название цели"
                    value={info.title}
                    onChangeText={val => setInfo({...info, title: val})}
                />
                <View style={styles.header}>
                    <TextInput
                        style={styles.textInput}
                        label="Количество"
                        keyboardType={'numeric'}
                        value={info.count ? info.count.toString() : ''}
                        onChangeText={val => setInfo({...info, count: parseInt(val.replace(/[^0-9]/g, ''))})}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Шаг"
                        keyboardType={'numeric'}
                        value={info.step ? info.step.toString() : ''}
                        onChangeText={val => setInfo({...info, step: parseInt(val.replace(/[^0-9]/g, ''))})}
                    />
                </View>
            </View>

            <ColorPicker colors={colorsList} />
        </ScrollView>
    );
};

export default AddForm;
