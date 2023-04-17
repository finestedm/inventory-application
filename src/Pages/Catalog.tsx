import axios from "axios"
import { useEffect, useState } from "react"
import CardList from "../components/CardList";
import { IPart } from "./Parts";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ILocation } from "./Locations";
import TagCloud from "../components/TagCloud";
import { Link } from "react-router-dom";

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


    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/parts?limit=4`)
            .then((response) => setParts(response.data))
        axios.get('/locations')
            .then((response) => setLocations(response.data))
    }, [])


    return (
        <>
            <Container maxWidth={false}>
                <Box sx={{ height: '300px', backgroundColor: 'red' }}>
                </Box>
            </Container>
            <Container maxWidth='xl'>
                <Stack spacing={3}>
                    <Box>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5' noWrap>Browser newest parts:</Typography>
                            <Button href="catalog/parts/">See all parts</Button>
                        </Stack>
                        <CardList parts={parts} />
                    </Box>
                    <Box>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5'>Our shops are in these cities:</Typography>
                            <Button href="catalog/locations/">See all shops</Button>
                        </Stack>
                        <CardList locations={locations} />
                    </Box>
                    <Box>
                        <Typography variant='h5'>Look for products categorized by tags:</Typography>
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