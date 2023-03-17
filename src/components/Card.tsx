import {Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material'
import { IPart } from '../Pages/Parts';
import { Link } from 'react-router-dom';

interface CardProps extends React.PropsWithChildren<{}> {
    part: IPart;
  }

export default function PartCard(part: CardProps) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                {part.part.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {part.part.manufacturer}
            </Typography>
            <Typography variant="body2" sx={{fontSize: 20}}>
                {part.part.price}
            </Typography>
        </CardContent>
        <CardActions>
            <Button href={`/catalog/parts/${part.part._id}`} size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }