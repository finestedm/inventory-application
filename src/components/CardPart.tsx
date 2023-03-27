import {Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid} from '@mui/material'
import { IPart } from '../Pages/Parts';

interface CardProps extends React.PropsWithChildren<{}> {
    part: IPart;
  }

export default function CardPart({part}: CardProps) {
  return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card >
          <CardContent>
            <Skeleton variant='rectangular' height={200} width='100%' />
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  {part.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {part.manufacturer}
              </Typography>
              <Typography variant="body2" sx={{fontSize: 20}}>
                  {part.price}
              </Typography>
          </CardContent>
          <CardActions>
              <Button href={`/catalog/parts/${part._id}`} size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }