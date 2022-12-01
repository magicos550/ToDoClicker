import * as React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {
    Button,
    Divider,
    HelperText,
    IconButton,
    MD3Colors,
    Portal,
    Snackbar,
    Text,
    TextInput
} from 'react-native-paper';
import {colorsList} from "../../../colorsConfig";
import ColorPicker from "./ColorPicker";
import {useBottomSheet} from "@gorhom/bottom-sheet";
import {db} from "../../../db";
import {addCard, editCard, removeCard} from "../../../store/slices/cardsSlice";
import {useDispatch} from "react-redux";

interface iToDo {
    title: string | null,
    target: number | null,
    step: number | null,
    color: string | null
}

interface iProps {
    cardInfo?: iToDo,
    cardId?: number
}

const initialState = {
    title: null,
    target: null,
    step: null,
    color: null
}

const AddForm = ({cardInfo, cardId}: iProps) => {
    const [info, setInfo] = React.useState<iToDo>(cardInfo || initialState);

    const dispatch = useDispatch();

    const { close } = useBottomSheet();

    const updateColor = (color: string) => {
        setInfo({...info , color: color})
    }

    const [visible, setVisible] = React.useState(false);

    const onDismissSnackBar = () => setVisible(false);

    const checkForm = async (id?: number) => {
        if([...Object.values(info)].every(e => e) && info.target >= info.step) {
            id ? await editCurrentCard(id): await addNewCard();
            //setInfo(initialState);
            close();
        } else {
            setVisible(true);
        }
    }

    const addNewCard = async () => {
        await db.transaction((tx) => {
            tx.executeSql(
              `insert into todos (title, target, score, step, color) values (?, ?, ?, ?, ?)`,
              [info.title , info.target, 0, info.step, info.color],
              (transaction, result) => {
                  dispatch(addCard(
                    [
                        {
                            "ID": result.insertId,
                            "title": info.title,
                            "target": info.target,
                            "score": 0,
                            "step": info.step,
                            "color": info.color
                        }
                    ]
                  ));
              }
            )
        });
        setInfo(initialState);
    }

    const editCurrentCard = async (id: number) => {
        if([...Object.values(info)].every(e => e)) {
            await db.transaction((tx) => {
                tx.executeSql(
                  `update todos set title=?, target=?, step=?, color=? where ID=?`,
                  [info.title , info.target, info.step, info.color, id],
                  (transaction, result) => {
                      dispatch(editCard({
                          "ID": id,
                          "title": info.title,
                          "target": info.target,
                          "step": info.step,
                          "color": info.color
                      }))
                  }
                )
            });
            close();
        } else {
            setVisible(true);
        }
    }

    const resetCard = (): void => setInfo(initialState);

    const deleteCard = (id: number): void => {
        db.transaction((tx) => {
            tx.executeSql(
              `delete from todos where ID=${id}`,
              null,
              async () => {
                  await dispatch(removeCard(id));
              }
            )
        });
        close();
    }

    return (
        <View style={[styles.container, styles.wrapper]}>
            <Text>{JSON.stringify(cardInfo)}</Text>
            <View style={styles.header}>
                <IconButton
                    mode='contained'
                    containerColor={MD3Colors.neutral20}
                    icon="close"
                    iconColor={MD3Colors.error50}
                    size={27}
                    onPress={() => close()}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{cardInfo ? 'Редактировать цель' : 'Добавить новую цель'}</Text>
                <IconButton
                    mode='contained'
                    containerColor={MD3Colors.neutral20}
                    icon={cardInfo ? "check" : "plus"}
                    iconColor='#9ebd79'
                    size={27}
                    onPress={() => cardInfo ? checkForm(cardId) : checkForm()}
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
                <HelperText style={styles.helperText} type="error" visible={!info.title}>
                    Заполните название цели
                </HelperText>
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
                            onChangeText={val => setInfo({...info, target: parseInt(val)})}
                        />
                        <HelperText style={styles.helperText} type="error" visible={!info.target}>
                            Заполните количество
                        </HelperText>
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
                            onChangeText={val => setInfo({...info, step: parseInt(val)})}
                        />
                        <HelperText style={styles.helperText} type="error" visible={!info.step}>
                            Заполните шаг
                        </HelperText>
                        <HelperText style={styles.helperText} type="error" visible={info.step > info.target}>
                            Шаг больше цели
                        </HelperText>
                    </View>
                </View>
            </View>

            <ColorPicker currentColor={info.color} updateColor={updateColor} colors={colorsList} />
            <HelperText type="error" visible={!info.color}>
                Выберите цвет цели
            </HelperText>
            {cardInfo ?
              <Button mode={'contained-tonal'} labelStyle={styles.buttonContent} onPress={() => deleteCard(cardId)}>Удалить цель</Button>
              :
              <Button mode={'contained-tonal'} labelStyle={styles.buttonContent} onPress={() => resetCard()}>Сбросить</Button>
            }

            <Portal>
                <Snackbar
                  visible={visible}
                  onDismiss={onDismissSnackBar}
                  duration={3000}
                  action={{
                      label: 'Закрыть',
                      onPress: () => {
                          setVisible(false);
                      },
                  }}>
                    {info.target < info.step ? 'Шаг больше цели' : 'Вы не заполнили все поля.'}
                </Snackbar>
            </Portal>
        </View>
    );
};

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
    },
    helperText: {
        marginTop: -20,
        paddingLeft: 0
    },
    buttonContent: {
        fontSize: 18,
    }
});

export default AddForm;
