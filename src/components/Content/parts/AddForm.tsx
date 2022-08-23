import * as React from 'react';
import {StatusBar, StyleSheet, View} from "react-native";
import {IconButton, MD3Colors, Text, TextInput} from 'react-native-paper';
import {colorsList} from "../../../colorsConfig";
import ColorPicker from "./ColorPicker";

const AddForm = (props) => {
    const [text, setText] = React.useState("");


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
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    mode='contained'
                    containerColor={MD3Colors.neutral20}
                    icon="close"
                    iconColor={MD3Colors.error50}
                    size={30}
                    onPress={() => console.log('Pressed')}
                />
                <Text style={{fontSize: 20}}>Добавить новую цель</Text>
                <IconButton
                    mode='contained'
                    containerColor={MD3Colors.neutral20}
                    icon="plus"
                    iconColor={MD3Colors.tertiary100}
                    size={30}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <View style={styles.container}>
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <View style={styles.header}>
                    <TextInput
                        style={styles.textInput}
                        label="Количество"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Шаг"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
            </View>

            <ColorPicker colors={colorsList} />
        </View>
    );
};

export default AddForm;
