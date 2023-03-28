import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from "@emotion/react";

export default function BuyButton() {
    const theme = useTheme();
    return (
        <Button sx={{ minWidth: '3rem', backgroundColor: 'primary.light' }}>
            <AddShoppingCartIcon sx={{ color: 'white', height: '1.2rem' }} />
        </Button>
    )
}