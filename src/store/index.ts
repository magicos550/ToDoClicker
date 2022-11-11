import {configureStore} from "@reduxjs/toolkit";
import cardsReducer from './slices/cardsSlice'

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
    }
})
