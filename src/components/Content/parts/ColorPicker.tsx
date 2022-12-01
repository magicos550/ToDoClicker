import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';
import useGetContrast from '../../../hooks/useGetContrast';

interface iColorPickerProps {
    currentColor: string,
    colors: string[],
    updateColor: (color: string) => void
}

const ColorPicker = (props: iColorPickerProps) => {
    return (
        <View style={styles.colorPickerBox}>
            <Text style={styles.label}>Выберите цвет</Text>
            <View style={styles.colorPickerWrapper}>
                <FlatGrid
                  data={props.colors}
                  itemDimension={50}
                  spacing={10}
                  maxItemsPerRow={5}
                  additionalRowStyle={{marginBottom: 0}}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[styles.colorPickerItem, {backgroundColor: item}]}
                        onPress={() => {
                            props.updateColor(item);
                        }}
                      >
                      {props.currentColor === item
                        ? <Ionicons name='checkmark' size={32} color={useGetContrast(item) ? 'black' : 'white'}></Ionicons>
                        : ''
                      }
                  </TouchableOpacity>
                )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    colorPickerWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: '100%',
        flexDirection: "row",
        marginTop: 10,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#323232'
    },
    colorPickerItem: {
        flexGrow: 1,
        borderRadius: 5,
        width: '100%',
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    colorPickerBox: {
        padding: 5,
    },
    label: {
        fontSize: 18
    }
});

export default ColorPicker
