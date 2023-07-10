import { RootState } from "@/features/combineReducer";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Drawer, Grid, List, ListItem, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen } from '@/features/cart';
import CartPartCard from "./CartPartCard";

export default function CartDrawer() {

    const cartOpen = useSelector((state: RootState) => state.cart.cartOpen);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useDispatch()
    const theme = useTheme()

    return (
        <Drawer
            anchor='right'
            open={cartOpen}
            onClose={() => dispatch(setCartOpen(false))}
        >
            <Stack direction='column' flex={1} alignItems='center' spacing={6} sx={{ p: 4 }}>
                <Typography variant="h4">Your cart</Typography>
                {cart.length > 0 ?
                    (
                        <List component={Stack} spacing={3}>
                            {cart.map(cartPart => <CartPartCard cartPart={cartPart} />)}
                        </List>
                    )
                    :
                    (
                        <Typography variant="h2"> Cart empty </Typography>
                    )
                }
            </Stack>
        </Drawer >
    )
}