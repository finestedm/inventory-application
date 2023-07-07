import { IPart } from "@/components/interfaces";
import { PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

interface ICartState {
    cartOpen: boolean;
    cart: IPart[]
}

const initialCartState: ICartState = {
    cartOpen: false,
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        setCartOpen: (state, action: PayloadAction<boolean>) => {
            state.cartOpen = action.payload;
        },
        addToCart: (state, action: PayloadAction<IPart>) => {
            state.cart.push(action.payload);
        },
    },
});

export const { setCartOpen, addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;