import axios from "axios"
import { useEffect, useState } from "react"
import { ITag, IPart } from "@/components/interfaces";
import { useParams } from "react-router-dom";

import CardList from "../components/CardList";
import { Container, Typography } from "@mui/material";

export default function Tag(): JSX.Element {

    const params = useParams();

    // set initial states tag and parts which use this tag
    const [tag, setTag] = useState<ITag>()
    const [partsTagged, setPartsTagged] = useState<IPart[]>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/tags/${params.name}`)
            .then((response) => {
                setTag(response.data.tag);
                setPartsTagged(response.data.partsTagged);
            })
    }, [])

    return (
        <Container maxWidth='xl'>
            {tag &&
                <div style={{ display: 'flex' }}>
                    <Typography noWrap variant="h4" sx={{marginRight: '.5rem'}}>Browse parts tagged with: </Typography>
                    <Typography noWrap variant="h4" sx={{fontWeight: 700}} color='primary'>#{tag.name}</Typography>
                </div>}
            {partsTagged && <CardList parts={partsTagged} />}
        </Container>
    )

}