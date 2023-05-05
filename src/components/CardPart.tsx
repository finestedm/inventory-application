import { Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid, useTheme, Link, CardActionArea, Stack, Menu, MenuItem, CardMedia } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import BuyButton from './BuyButton';
import { useSelector, useDispatch } from "react-redux";
import { RootState, setPartData, setPartDeleteModalOpen, setPartEditModalOpen } from "../features/modalSlide";
// @ts-ignore
import { imagefrombuffer } from 'imagefrombuffer'
import { IPart } from './interfaces';

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
  const dispatch = useDispatch();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ position: 'relative' }} >
        <Button sx={{ position: 'absolute', zIndex: 1000, right: 0, top: 15 }} onClick={handleAnchorSetting}>
          <MoreVertIcon sx={{ color: 'black' }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={editMenuOpen}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {
            dispatch(setPartEditModalOpen(true))
            dispatch(setPartData(part))
          }}>Edit</MenuItem>
          <MenuItem onClick={() => { dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: true, partData: part })) }
          }>Delete</MenuItem>
        </Menu>

        <CardActionArea href={`/catalog/parts/${part._id}`}>
          <CardMedia sx={{ width: '100%', height: 275, }}>

            {part.photo ?

              <Box
                sx={{ width: '100%', height: '100%', }}
              >
                <img
                  style={{ objectFit: 'cover', height: '100%', width: '100%', }}
                  src={imagefrombuffer({
                    type: part.photo.contentType, // example image/jpeg 
                    data: part.photo.data.data, // array buffer data 
                  })}
                />
              </Box>
              :

              <Skeleton variant='rectangular' height='100%' width='100%' />
            }

          </CardMedia>
          <CardContent>
            <Box p={2}>
              <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'} gutterBottom>
                {part.name}
              </Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='end'>
                <Stack>
                  <Typography color={theme.palette.grey[400]}> Price: </Typography>
                  <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'}>
                    {part.price.toFixed(2)} PLN
                  </Typography>
                </Stack>
                <BuyButton />
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}