import * as React from "react";
import {StyleSheet, View} from "react-native";
import {IconButton, MD3Colors} from "react-native-paper";
import {useState} from "react";

interface iColorPickerProps {
    colors: {
       [key: string]: string
    }
}

const ColorPicker = (props: iColorPickerProps) => {
    const [color, setColor] = useState('');

    const styles = StyleSheet.create({
        colorPickerWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: '100%',
            flexDirection: "row",
            padding: 5,
            marginTop: 10
        },
        colorPickerItem: {
            width: 62,
            height: 62,
            borderRadius: 10,
            marginTop: 5,
        },
        check: {
            alignSelf: "center"
        }
    });

    return (
        <View style={styles.colorPickerWrapper}>
            {Object.keys(props.colors).map((item) => (
                <IconButton
                    key={item}
                    icon={color === item ? 'check' : ''}
                    iconColor={MD3Colors.primary0}
                    size={40}
                    style={[styles.colorPickerItem, {backgroundColor: props.colors[item]}]}
                    onPress={() => setColor(item)}
                />
            ))}
        </View>
    )
}

export default ColorPicker
