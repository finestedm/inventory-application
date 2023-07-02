import { RootState } from "@/features/combineReducer";
import { Box, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from '@/features/cart';

export default function CartDrawer() {

    const cartOpen = useSelector((state: RootState) => state.cart.cartOpen);
    const dispatch = useDispatch()

    return (
        < Drawer
            anchor='right'
            open={cartOpen}
            onClose={() => dispatch(setCartOpen(false))}
        >
            <Box>
                <h2>eee</h2>
            </Box>
        </Drawer >
    )
}