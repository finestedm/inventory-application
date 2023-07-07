import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IPart } from "./interfaces";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart";

export default function BuyButton({ part }: { part: IPart }) {

    const dispatch = useDispatch()

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(addToCart(part))
    };

    return (
        <Button
            sx={{ minWidth: '3rem', backgroundColor: 'primary.light' }}
            onClick={handleButtonClick}
        >
            <AddShoppingCartIcon sx={{ color: 'white', height: '1.2rem' }} />
        </Button>
    )
}