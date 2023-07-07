import { RootState } from "@/features/combineReducer";
import { Box, Drawer, List, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from '@/features/cart';

export default function CartDrawer() {

    const cartOpen = useSelector((state: RootState) => state.cart.cartOpen);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useDispatch()

    console.log(cart)

    return (
        <Drawer
            anchor='right'
            open={cartOpen}
            onClose={() => dispatch(setCartOpen(false))}
        >
            <Box>
                {cart.length > 0 ?
                    (
                        <List>
                            {cart.map(item => <ListItem>{item.part.name}, {item.numberOfParts}. Total: {item.part.price * item.numberOfParts} PLN</ListItem>)}
                        </List>
                    )
                    :
                    (
                        <Typography variant="h2"> Cart empty </Typography>
                     )
                }
            </Box>
        </Drawer >
    )
}