import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { modalReducer } from "./modalSlice";
import { searchReducer } from "./searchSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    modal: modalReducer,
    search: searchReducer,
    cart: cartReducer
});

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>