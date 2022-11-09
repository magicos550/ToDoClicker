import * as React from "react";
import {StyleSheet, View} from "react-native";
import {IconButton, MD3Colors, Text} from "react-native-paper";

interface iColorPickerProps {
    currentColor: string,
    colors: {
       [key: string]: string
    },
    updateColor: (color: string) => void
}

const ColorPicker = (props: iColorPickerProps) => {

    const styles = StyleSheet.create({
        colorPickerWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: '100%',
            flexDirection: "row",
            padding: 5,
            marginTop: 10,
            borderColor: 'transparent',
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: '#323232'
        },
        colorPickerItem: {
            flexGrow: 1,
            width: 55,
            height: 55,
            borderRadius: 5,
            marginHorizontal: 5,
            marginVertical: 5
        },
        check: {
            alignSelf: "center"
        },
        colorPickerBox: {
            padding: 5,
        },
        label: {
            fontSize: 18
        }
    });

    return (
        <View style={styles.colorPickerBox}>
            <Text style={styles.label}>Выберите цвет</Text>
            <View style={styles.colorPickerWrapper}>
                {Object.keys(props.colors).map((item) => (
                    <IconButton
                        key={item}
                        icon={props.currentColor === props.colors[item] ? 'check' : ''}
                        iconColor={MD3Colors.primary0}
                        size={40}
                        style={[styles.colorPickerItem, {backgroundColor: props.colors[item]}]}
                        onPress={() => {
                            props.updateColor(props.colors[item]);
                        }}
                    />
                ))}
            </View>
        </View>
    )
}

export default ColorPicker
