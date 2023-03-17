import axios from "axios"
import { useEffect, useState } from "react"
import { IPart } from "./Parts"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Container, Grid, Skeleton } from "@mui/material";

export default function Part(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [part, setPart] = useState<IPart>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/parts/${params.id}`)
            .then((response) => setPart(response.data))
    }, [])


    if (part) {
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="rectangular" style={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh' }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h1" > {part.name}</Typography >
                        <Typography variant="h3" > {part.manufacturer}</Typography >
                        <div style={{display: 'flex'}}>
                            <Typography noWrap variant="h2" > {part.price} </Typography >
                            <Typography noWrap variant="h4">PLN</Typography> 
                        </div>
                        {(part.tags).map(tag =>
                            <Button key={tag._id} href={`/catalog/tags/${tag.name}`}>
                                <Typography variant="h5" >
                                    {`#${tag.name}`}
                                </Typography>
                            </Button>
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