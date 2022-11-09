import {createSlice} from "@reduxjs/toolkit";

interface iCard {
    [key: number]:  {
        ID: number | null,
        Title: string | null,
        Target: number | null,
        Step: number | null,
        Color: string | null,
        Score: number | null,
    }
}

const initialState = {}


const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard(state, action) {
            let newState = {}
            action.payload.map((item) => {
                return newState[item.ID] = {...item}
            })
            return {...state , ...newState}
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
        }
    }
})

export const {addCard, removeCard} = cardsSlice.actions;

export default cardsSlice.reducer;
