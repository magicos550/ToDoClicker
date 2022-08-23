import * as React from 'react';
import {StyleSheet, View} from "react-native";
import {FAB, useTheme} from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import {useRef} from "react";
import AddForm from "./Content/parts/AddForm";

const BottomNav = () => {
    const refRBSheet = useRef(null);

    const {colors} = useTheme();

    return (
        <View style={styles.view}>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => refRBSheet.current.open()}
            />
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={450}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    container: {
                        backgroundColor: colors.surfaceVariant
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <AddForm />
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 0,
        bottom: 25,
        alignSelf: 'center'
    },
    view: {
        height: 50,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,.1)',
        width: '100%',
    }
})

export default BottomNav;
