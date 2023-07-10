import { ICartItem } from "@/features/cart";
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function CartPartCard({ cartPart }: { cartPart: ICartItem }) {
    const theme = useTheme()

    let imageUrl = ''
    if (cartPart.part.photo) {
        const blob = new Blob([Uint8Array.from(cartPart.part.photo.data.data)], { type: cartPart.part.photo.contentType });
        imageUrl = URL.createObjectURL(blob);
    }

    return (
        <Card sx={{height: '150px'}}>
            <CardActionArea component={Link} to={`/catalog/parts/${cartPart.part._id}`} sx={{ height: '100%' }}>
                <Stack direction='row' spacing={2}>
                    <CardMedia sx={{ maxWidth: '30%' }}>

                        {cartPart.part.photo ?

                            <Box
                                sx={{ width: '100%', height: '100%', }}
                            >
                                <img
                                    className='cart-part-photo'
                                    style={{ objectFit: 'contain', height: '100%', width: '100%', }}
                                    src={imageUrl}
                                />
                            </Box>
                            :
                            <Skeleton variant='rectangular' height='100%' width='100%' />
                        }

                    </CardMedia>
                    <CardContent>
                        <Box p={2}>
                            <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'} gutterBottom>
                                {cartPart.part.name}
                            </Typography>
                            <Stack direction='row' justifyContent='space-between' alignItems='end'>
                                <Stack direction='row' spacing={1}>
                                    <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'}>
                                        {cartPart.part.price.toFixed(2)} PLN
                                    </Typography>
                                    <Typography color={theme.palette.grey[400]}> X </Typography>
                                    <Typography sx={{ fontWeight: 600 }} letterSpacing={'-.25px'}>
                                        {cartPart.numberOfParts}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Divider sx={{mt: 2}} />
                            <Typography sx={{ fontSize: '120%', fontWeight: 600 }}>Total: {cartPart.part.price * cartPart.numberOfParts} PLN</Typography>
                        </Box>
                    </CardContent>
                </Stack>
            </CardActionArea>
        </Card >
    )

}