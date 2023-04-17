import { Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid, Menu, MenuItem, CardActionArea, CardMedia, Stack, useTheme } from '@mui/material'
import { ILocation } from '../Pages/Locations';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setLocationData, setLocationDeleteModalOpen, setLocationEditModalOpen } from '../App';
import LocationMap from './LocationMap';


interface CardProps extends React.PropsWithChildren<{}> {
    location: ILocation;
}

export default function CardLocation({ location }: CardProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const editMenuOpen = Boolean(anchorEl);
    const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    const googleMapOptions = {
        disableDefaultUI: true
    }

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

                <CardActionArea href={`/catalog/locations/${location._id}`}>
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
    );
}