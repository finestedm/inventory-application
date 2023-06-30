import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Container, Grid, Skeleton, Menu, MenuItem, Stack, Divider, useTheme } from "@mui/material";
import { ILocation } from "@/components/interfaces";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from "react-redux";
import { setLocationData, setLocationDeleteModalOpen, setLocationEditModalOpen, setLocationOpenHoursEditModalOpen } from "../features/modalSlice";
import LocationMap from "../components/LocationMap";
import dayjs from "dayjs";


export default function Location(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [location, setLocation] = useState<ILocation>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/locations/${params.id}`)
            .then((response) => setLocation(response.data))
    }, [])

    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const editMenuOpen = Boolean(anchorEl);
    const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    if (location) {
        return (
            <Container maxWidth='xl'>
                <Grid container sx={{ marginTop: 0 }} spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <LocationMap city={location.city} street={location.street} />
                    </Grid>
                    <Grid item xs={12} md={6} position='relative'>

                        <Button sx={{ position: 'absolute', zIndex: 1000, right: 25 }} onClick={handleAnchorSetting}>
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
                            }
                            }>Edit</MenuItem>
                            <MenuItem onClick={() => {
                                dispatch(setLocationOpenHoursEditModalOpen(true))
                                dispatch(setLocationData(location))
                            }
                            }>Edit opening hours</MenuItem>
                            <MenuItem onClick={() => { dispatch(setLocationDeleteModalOpen({ locationDeleteModalOpen: true, locationData: location })) }
                            }>Delete</MenuItem>
                        </Menu>

                        <Stack spacing={2}>
                            <Typography variant="h5"> {location.street}</Typography >
                            <Typography variant="h4" > {`${location.zip.toString().slice(0, 2) + '-' + location.zip.toString().slice(2)} ${location.city}`}</Typography >
                            <Divider />
                            <Typography variant="body1" > {location.phoneNumber}</Typography >
                            <Typography variant="body1" > {location.email}</Typography >

                            <Divider />


                            {(Object.entries(location.openingHours)).map(([day, openingHours]) =>
                                <Typography variant="h5" key={day}>
                                    {!openingHours.open && !openingHours.close ? `${day}: Closed` : `${day}: ${dayjs(openingHours.open).format('HH:mm')} - ${dayjs(openingHours.close).format('HH:mm')} `}
                                </Typography>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Container >
        )
    } else {
        return (
            < CircularProgress />
        )
    }

}