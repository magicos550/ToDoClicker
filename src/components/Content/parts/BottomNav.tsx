import * as React from 'react';
import {Keyboard, Platform, StyleSheet, View} from "react-native";
import {FAB, IconButton, MD3Colors, Portal, Text, useTheme} from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from "react";
import AddForm from "./AddForm";

const BottomNav = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [450], []);

    const handleSheetChanges = useCallback((index: number) => {
        Keyboard.dismiss();
    }, []);

    const {colors} = useTheme();

    return (
        <View style={styles.view}>
            <FAB
                icon="plus"
                style={styles.fab}
                color={MD3Colors.neutral100}
                onPress={() => bottomSheetRef.current.snapToIndex(0)}
            />
            <Portal>
                <BottomSheet
                  ref={bottomSheetRef}
                  index={-1}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
                  enablePanDownToClose={true}
                  enableHandlePanningGesture={false}
                  backgroundStyle={{backgroundColor: colors.surfaceVariant}}
                >
                    <View style={styles.header}>
                        <IconButton
                          mode='contained'
                          containerColor={MD3Colors.neutral20}
                          icon="close"
                          iconColor={MD3Colors.error50}
                          size={30}
                          onPress={() => bottomSheetRef.current.close()}
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
                    <AddForm />
                </BottomSheet>
            </Portal>
            <View style={styles.left} />
            <View style={styles.right} />
        </View>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 0,
        bottom: 2,
        alignSelf: 'center',
        backgroundColor: MD3Colors.neutral50,
        borderRadius: 100,
        /*zIndex: 2,*/
        borderColor: MD3Colors.neutral10
    },
    view: {
        height: 50,
        position: 'absolute',
        bottom: 0,
        //backgroundColor: 'rgba(255,255,255,.1)',
        width: '100%',
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    left: {
        width: '45%',
        height: 20,
        bottom: -5,
        borderTopRightRadius: 30,
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.1)',
        transform: [
            {scaleY: .5},
        ],
    },
    right: {
        width: '45%',
        height: 20,
        bottom: -5,
        right: 0,
        borderTopLeftRadius: 30,
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.1)',
        transform: [
            {scaleY: .5},
        ],
    }
})

export default BottomNav;