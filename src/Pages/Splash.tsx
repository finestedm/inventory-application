import { Button, Typography } from "@mui/material";
import main from '../images/main.jpg'
import { Link } from "react-router-dom";

function Splash() {
    return (
        <main style={{ backgroundImage: `url(${main})`, backgroundSize: 'cover' }}>
            <Typography variant="h3">Welcome to the untitled hardware store</Typography>
            <Typography variant="h5">Browse our products</Typography>
            <Button component={Link} to='/catalog' variant="outlined" size="large">Browser catalog</Button>
        </main>
    )
}

export default Splash