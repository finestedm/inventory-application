import { Button, Container, Menu } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"

export interface ITag {
    _id: string;
    name: string;
}

export default function Tags(): JSX.Element {


    // set initial states of catalogCounts with declared types of data
    const [tags, setTags] = useState<ITag[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/tags')
            .then((response) => setTags(response.data))
    }, [])

    const [newTagMenuOpen, setNewTagMenuOpen] = useState(false)

    return (
        <Container maxWidth='xl'>
            <h2>List of tags</h2>
            <ul>
                {(tags).map(tag =>
                    <li key={tag._id}>
                        <Button href={`/catalog/tags/${tag.name}`}>
                            {tag.name}
                        </Button>
                    </li>
                )}
                {/* <li>
                    <Menu
                        open={newTagMenuOpen}
                    >

                    </Menu>
                </li> */}
            </ul>
        </Container>
    )

}