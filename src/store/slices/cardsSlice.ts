import {createSlice} from "@reduxjs/toolkit";

interface iCard {
    [key: number]:  {
        ID: number | null,
        title: string | null,
        target: number | null,
        step: number | null,
        color: string | null,
        score: number | null,
    }
}

const initialState = {}


const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard(state, action) {
            let newState = {}
            action.payload.map((item) => newState[item.ID] = {...item});

            return {...state , ...newState}
        },
        editCard(state, action) {
            state[action.payload.ID] = {...state[action.payload.ID], ...action.payload}
        },
        removeCard(state, action) {
            const newState = Object.keys(state).filter(key =>
                key !== action.payload.toString()).reduce((obj, key) =>
                {
                    obj[key] = state[key];
                    return obj;
                }, {}
            );

            return newState;
        },
    }
})

export const {addCard, editCard, removeCard} = cardsSlice.actions;

export default cardsSlice.reducer;
