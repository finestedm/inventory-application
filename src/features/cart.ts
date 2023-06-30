import { PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

interface ICartState {
    cartOpen: boolean;
}

const initialCartState: ICartState = {
    cartOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        setCartOpen: (state, action: PayloadAction<boolean>) => {
            state.cartOpen = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const { setCartOpen } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;