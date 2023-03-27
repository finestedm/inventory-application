import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Container, Grid, Skeleton } from "@mui/material";
import { ILocation } from "./Locations";

export default function Location(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [location, setLocation] = useState<ILocation>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/locations/${params.id}`)
            .then((response) => setLocation(response.data))
    }, [])


    if (location) {
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="rectangular" style={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh' }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h1" > {location.city}</Typography >
                        <Typography variant="h3" > {location.street}</Typography >
                        <Typography variant="h3" > {`${location.zip.toString().slice(0, 2) + '-' + location.zip.toString().slice(2)} ${location.city}`}</Typography >
                        <Typography variant="h4" > {location.country}</Typography >
                        {(location.openingHours).map(day =>
                            <Typography variant="h5" >
                                {`${day.day}: ${day.open} - ${day.close} `}
                            </Typography>
                        )}
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