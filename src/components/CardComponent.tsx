import { Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid, useTheme, CardActionArea, Stack, Menu, MenuItem, CardMedia } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import BuyButton from './BuyButton';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setLocationData, setLocationDeleteModalOpen, setLocationEditModalOpen, setPartData, setPartDeleteModalOpen, setPartEditModalOpen, setPhotoUploadModalOpen } from "../features/modalSlice";
import { RootState } from '@/features/combineReducer';
// @ts-ignore
import { ILocation, IPart } from './interfaces';
import LocationMap from './LocationMap';

interface CardProps extends React.PropsWithChildren<{}> {
  part?: IPart;
  location?: ILocation
}

export default function CardComponent({ part, location }: CardProps) {
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const editMenuOpen = Boolean(anchorEl);
  const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();

  let imageUrl = ''
  if (part?.photo) {
    const blob = new Blob([Uint8Array.from(part.photo.data.data)], { type: part.photo.contentType });
    imageUrl = URL.createObjectURL(blob);
  }

  const googleMapOptions = {
    disableDefaultUI: true
  }
  if (part) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ position: 'relative', height: '100%' }} >
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
            <MenuItem onClick={() => {
              dispatch(setPhotoUploadModalOpen(true))
              dispatch(setPartData(part))
            }
            }>Change photo</MenuItem>
            <MenuItem onClick={() => { dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: true, partData: part })) }
            }>Delete</MenuItem>
          </Menu>

          <CardActionArea component={Link} to={`/catalog/parts/${part._id}`} sx={{ height: '100%' }}>
            <CardMedia sx={{ width: '100%', height: 275, }}>

              {part.photo ?

                <Box
                  sx={{ width: '100%', height: '100%', }}
                >
                  <img
                    className='card-part-photo'
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
                  {part.name}
                </Typography>
                <Stack direction='row' justifyContent='space-between' alignItems='end'>
                  <Stack>
                    <Typography color={theme.palette.grey[400]}> Price: </Typography>
                    <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'}>
                      {part.price.toFixed(2)} PLN
                    </Typography>
                  </Stack>
                  <BuyButton part={part} />
                </Stack>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  } else if (location) {
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
              dispatch(setLocationEditModalOpen(true))
              dispatch(setLocationData(location))
            }}>
              Edit</MenuItem>
            <MenuItem onClick={() => { dispatch(setLocationDeleteModalOpen({ locationDeleteModalOpen: true, locationData: location })) }}>
              Delete</MenuItem>
          </Menu>

          <CardActionArea component={Link} to={`/catalog/locations/${location._id}`}>
            <CardMedia>
              <Box sx={{ height: 250, width: '100%' }}>
                <LocationMap city={location.city} street={location.street} options={googleMapOptions} />
              </Box>
            </CardMedia>
            <CardContent>
              <Box p={2}>
                <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'} gutterBottom>
                  {location.city}
                </Typography>
                <Stack direction='row' justifyContent='space-between' alignItems='end'>
                  <Stack>
                    <Typography sx={{ fontWeight: 500 }} letterSpacing={'-.25px'}>
                      {location.zip.toString().slice(0, 2) + '-' + location.zip.toString().slice(2)}, {location.street}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  } else {
    return <h1>error</h1>
  }
}