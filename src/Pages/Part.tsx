import axios from "axios"
import { useEffect, useState } from "react"
import { IPart } from "./Parts"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Container, Grid, Skeleton, Box, Chip, useTheme, List, ListItem, ListItemText, ListItemButton, Stack, Divider } from "@mui/material";
import { ILocation } from "./Locations";
import { IInventory } from "./Inventories";
import TagCloud from "../components/TagCloud";
import BuyButton from "../components/BuyButton";

export default function Part(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [part, setPart] = useState<IPart>()
    const [inventory, setInventory] = useState<IInventory[]>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/parts/${params.id}`)
            .then((response) => setPart(response.data))
        axios.get(`/availability/${params.id}`)
            .then((response) => setInventory(response.data))
    }, [])

    useEffect(() => {
        console.log(inventory)
    }, [inventory])

    const theme = useTheme()

    if (part && inventory) {
        return (
            <Container>
                <Grid container spacing={12}>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" style={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={2}>
                            <Typography mb={2} variant='h4' sx={{ fontWeight: 500 }}> {part.name}</Typography >
                            <Divider />
                            <Typography color={theme.palette.grey[500]}> {part.manufacturer}</Typography >
                            <Divider />
                            <div style={{ display: 'flex' }}>
                                <Typography noWrap variant="h4"> {part.price} </Typography >
                                <Typography noWrap variant="h6" color={theme.palette.grey[500]}>PLN</Typography>
                            </div>
                            <Divider />
                            <Box>
                                <Typography gutterBottom> Categories: </Typography >
                                {part.tags.map(tag =>
                                    <Chip
                                        key={tag._id}
                                        href={`/catalog/tags/${tag.name}`}
                                        label={tag.name}
                                        component="a"
                                        clickable
                                    />
                                )}
                            </Box>
                            <Divider />
                            <Box>
                                <Typography> Availability: </Typography >
                                <List>
                                    {inventory.map(inventory => {
                                        return inventory.location
                                            ?
                                            <ListItem key={inventory._id}>
                                                <ListItemText>
                                                    {inventory.location.city}: {inventory.available}
                                                </ListItemText>
                                            </ListItem>
                                            :
                                            ''
                                    })}
                                </List>
                            </Box>
                            <Divider />
                            <BuyButton />
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