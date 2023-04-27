import axios from "axios"
import { useEffect, useState } from "react"
import { ITag } from "./interfaces"
import { Box, Chip, CircularProgress, Grid, Stack } from "@mui/material"


export default function TagCloud(): JSX.Element {

    const [tags, setTags] = useState<ITag[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/tags')
            .then((response) => {
                setTags(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    if (loading) { // change this!
        return (
            <CircularProgress
                role="progressbar"
            />
        )
    } else {
        return (
            <Grid container spacing={2}>
                {tags.map(tag =>
                    <Grid item>
                        <Chip
                            key={tag._id}
                            href={`/catalog/tags/${tag.name}`}
                            label={tag.name}
                            component="a"
                            clickable
                        />
                    </Grid>
                )}
            </Grid>
        )
    }
}