import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Container, Grid, Skeleton, Menu, MenuItem, Stack, Divider, useTheme } from "@mui/material";
import { ILocation } from "./Locations";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from "react-redux";
import { setLocationData, setLocationDeleteModalOpen, setLocationEditModalOpen } from "../App";


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
                <Grid2 container sx={{ marginTop: 0 }} spacing={12}>
                    <Grid2 xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh', borderRadius: '.25rem' }} />
                    </Grid2>
                    <Grid2 xs={12} md={6} position='relative'>

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

                            {(location.openingHours).map(day =>
                                <Typography key={day.day} variant="h5" >
                                    {`${day.day}: ${day.open} - ${day.close} `}
                                </Typography>
                            )}
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container >
        )
    } else {
        return (
            < CircularProgress />
        )
    }

}