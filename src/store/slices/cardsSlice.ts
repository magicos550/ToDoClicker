import {createSlice} from "@reduxjs/toolkit";

interface iCard {
    ID: number | null,
    title: string | null,
    target: number | null,
    step: number | null,
    color: string | null,
    score: number | null,
}

interface iAddCardInterface {
    payload: iCard[],
    type: string
}

const initialState = {}


const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard(state, action: iAddCardInterface) {
            let newState = {}
            action.payload.map((item) => newState[item.ID] = {...item});

            return {...state , ...newState}
        },
        editCard(state, action) {
            state[action.payload.ID] = {...state[action.payload.ID], ...action.payload}
        },
        removeCard(state, action) {
            return Object.keys(state).filter(key =>
                key !== action.payload.toString()).reduce((obj, key) =>
                {
                    obj[key] = state[key];
                    return obj;
                }, {}
            );
        },
    }
})

export const {addCard, editCard, removeCard} = cardsSlice.actions;

export default cardsSlice.reducer;
