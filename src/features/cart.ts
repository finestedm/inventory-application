import { IPart } from "@/components/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICartItem {
    part: IPart;
    numberOfParts: number;
}

interface ICartState {
    cartOpen: boolean;
    cart: ICartItem[];
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
            const existingCartItem = state.cart.find(
                (item) => item.part._id === action.payload._id
            );
            if (existingCartItem) {
                existingCartItem.numberOfParts++;
            } else {
                state.cart.push({ part: action.payload, numberOfParts: 1 });
            }
        },
    },
});


export const { setCartOpen, addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
