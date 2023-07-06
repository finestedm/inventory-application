import axios from "axios"
import { useEffect, useState } from "react"
import CardList from "../components/CardList";
import { IPart, ILocation } from "@/components/interfaces";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import TagCloud from "../components/TagCloud";
import { Link } from "react-router-dom";
import CampaignCarousel from "@/components/CampaignCarousel";

export default function Catalog(): JSX.Element {

    // declare types in catalogCounts
    interface ICatalogCounts {
        [key: string]: number;
    }

    // set initial states of catalogCounts with declared types of data
    const [catalogCounts, setCatalogCount] = useState<ICatalogCounts>({
        partCount: 0,
        somethingElse: 3
    })

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/`)
            .then((response) => setCatalogCount(response.data))
    }, [])

    // set initial states of catalogCounts with declared types of data
    const [parts, setParts] = useState<IPart[]>([])
    const [locations, setLocations] = useState<ILocation[]>([])
    const [isLoadingParts, setIsLoadingParts] = useState<boolean>(false)
    const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(false)

    // get data from server: number of elements in each category
    useEffect(() => {
        setIsLoadingParts(true);
        setIsLoadingLocations(true)
        axios.get(`/parts?limit=4`)
            .then((response) => {
                setParts(response.data.partsData)
            })
            .finally(() => {
                setIsLoadingParts(false); // Set isLoading to false when data fetching is complete
            });
        axios.get('/locations')
            .then((response) => setLocations(response.data))
            .finally(() => {
                setIsLoadingLocations(false); // Set isLoading to false when data fetching is complete
            });
    }, [])


    return (
        <>
            <Container maxWidth={false} disableGutters  >
                <CampaignCarousel />
            </Container>
            <Container maxWidth='xl'>
                <Stack spacing={3}>
                    <Box>
                        <Grid container direction='row'>
                            <Grid container item sm={12} lg={6}>
                                <Grid item>
                                    <Typography variant='h5' noWrap>Browser newest parts:</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item sm={12} lg={6} justifyContent="flex-end">
                                <Grid item>
                                    <Button href="catalog/parts/">See all parts</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <CardList parts={parts} placeholder={isLoadingParts} perPage={4} />
                    </Box>
                    <Box>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5'>Our shops are in these cities:</Typography>
                            <Button href="catalog/locations/">See all shops</Button>
                        </Stack>
                        <CardList locations={locations} placeholder={isLoadingLocations} perPage={4} />
                    </Box>
                    <Box>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5'>Look for products categorized by tags:</Typography>
                            <Button href="catalog/tags/">Browse all tags</Button>
                        </Stack>
                        <TagCloud />
                    </Box>
                </Stack>
                <ul>
                    {Object.keys(catalogCounts).map(key => <li key={key}>{key}: {catalogCounts[key]}</li>)}
                </ul>
            </Container >
        </>
    )

}