import axios from "axios"
import { useEffect, useState } from "react"
import { ITag } from "../Pages/Tags"
import { Chip, CircularProgress, Stack } from "@mui/material"

export default function TagCloud(): JSX.Element {

    const [tags, setTags] = useState<ITag[]>([])

    useEffect(() => {
        axios.get('/tags')
            .then((response) => setTags(response.data))
    }, [])

    useEffect(() => {
        console.log(tags)
    }, [tags])

    if (tags) {
        return (
            <Stack>
                {tags.map(tag =>
                    <Chip
                        key={tag._id}
                        href={`/catalog/tags/${tag.name}`}
                        label={tag.name}
                        component="a"
                        clickable
                    />
                )}
            </Stack>
            
        )
    } else {
        return (
            < CircularProgress />
        )
    }
}