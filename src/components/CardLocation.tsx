import { Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid } from '@mui/material'
import { IPart } from '../Pages/Parts';
import { Link } from 'react-router-dom';
import { ILocation } from '../Pages/Locations';

interface CardProps extends React.PropsWithChildren<{}> {
    location: ILocation;
}

export default function CardLocation({ location }: CardProps) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card >
                <CardContent>
                    <Skeleton variant='rectangular' height={200} width='100%' />
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        {location.city}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {location.street}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={`/catalog/locations/${location._id}`} size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}