import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Typography } from "@mui/material";
import CardList from "../components/CardList";

interface OpeningHours {
    day: string; // This could be restricted to a specific set of values, e.g. 'monday', 'tuesday', etc.
    open: string;
    close: string;
}

export interface ILocation {
    _id: string;
    zip: string;
    street: string;
    city: string;
    country: string;
    openingHours: OpeningHours[]
}


export default function Parts(): JSX.Element {

    // set initial states of catalogCounts with declared types of data
    const [locations, setLocations] = useState<ILocation[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/locations')
            .then((response) => setLocations(response.data))
    }, [])

    return (
        <Container>
            <Typography variant="h4">You can buy our products in the below shops:</Typography>
            <CardList locations={locations} />
        </Container>
    )

}