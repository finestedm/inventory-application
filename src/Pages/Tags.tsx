import TagCloud from "@/components/TagCloud";
import { Button, Container, Menu } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"

export interface ITag {
    _id: string;
    name: string;
}

export default function Tags(): JSX.Element {

    const [newTagMenuOpen, setNewTagMenuOpen] = useState(false)

    return (
        <Container maxWidth='xl'>
            <h2>List of tags</h2>
            <TagCloud />
        </Container>
    )

}