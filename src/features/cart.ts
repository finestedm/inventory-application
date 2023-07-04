import { PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

interface ICartState {
    cartOpen: boolean;
    cart: String[]
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
        addToCart: (state, action: PayloadAction<String>) => {
            state.cart = state.cart.push(action.payload)
        }
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