import { Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid, useTheme, Link, CardActionArea, Stack, Menu, MenuItem } from '@mui/material'
import { IPart } from '../Pages/Parts';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

interface CardProps extends React.PropsWithChildren<{}> {
  part: IPart;
}

export default function CardPart({ part }: CardProps) {
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const editMenuOpen = Boolean(anchorEl);
  const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ position: 'relative' }}>
        <Button sx={{ position: 'absolute', zIndex: 9999, right: 0, top: 15 }} onClick={handleAnchorSetting}>
          <MoreVertIcon sx={{color: 'black'}} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={editMenuOpen}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>Edit</MenuItem>
        </Menu>
        
        <CardActionArea href={`/catalog/parts/${part._id}`}>
          <CardContent>
            <Skeleton variant='rectangular' height={250} width='100%' />
            <Box p={2}>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 500 }} letterSpacing={'-.5px'} gutterBottom>
                {part.name}
              </Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='end'>
                <Stack>
                  <Typography color={theme.palette.grey[400]}> Price: </Typography>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 500}} letterSpacing={'-.5px'}>
                    {part.price} PLN
                  </Typography>
                </Stack>
                <Button sx={{minWidth: '50px', backgroundColor: `${theme.palette.primary.light}`, aspectRatio: '1/1'}}>
                  <AddShoppingCartIcon sx={{color: 'white'}}/>
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}