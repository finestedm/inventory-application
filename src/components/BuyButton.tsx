import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function BuyButton() {
    return (
        <Button sx={{ minWidth: '3rem', backgroundColor: 'primary.light' }}>
            <AddShoppingCartIcon sx={{ color: 'white', height: '1.2rem' }} />
        </Button>
    )
}