import axios from "axios"
import { useEffect, useState } from "react"
import { IPart } from "./Parts"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button } from "@mui/material";

export default function Part(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [part, setPart] = useState<IPart>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/catalog/parts/${params.id}`)
            .then((response) => setPart(response.data))
    }, [])


    if (part) {
        return (
            <div>
                <Typography variant="h1" > {part.name}</Typography >
                <Typography variant="h3" > {part.manufacturer}</Typography >
                <Typography variant="h2" > {part.price}</Typography >
                {(part.tags).map(tag =>
                    <Button key={tag._id} href={`/catalog/tags/${tag.name}`}>
                        <Typography variant="h5" >
                            {tag.name}
                        </Typography>
                    </Button>
                )}
            </div >
        )
    } else {
        return (
            < CircularProgress />
        )
    }

}