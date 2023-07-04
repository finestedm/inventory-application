import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IPart } from "./interfaces";

export default function BuyButton({ part }: { part: IPart }) {
    return (
        <Button sx={{ minWidth: '3rem', backgroundColor: 'primary.light', zIndex: 1000 }} onClick={() => console.log(part)}>
            <AddShoppingCartIcon sx={{ color: 'white', height: '1.2rem' }} />
        </Button>
    )
}