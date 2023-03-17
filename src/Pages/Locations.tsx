import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Typography } from "@mui/material";

export interface ILocation {
    _id: string;
    city: string;
    country: string;
}


export default function Parts(): JSX.Element {

    // set initial states of catalogCounts with declared types of data
    const [locations, setLocations] = useState<ILocation[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/locations')
            .then((response) => setLocations(response.data))
    }, [])

    useEffect(() => {
        console.log(locations)
    }, [locations])

    return (
        <Container>
            <Typography variant="h4">You can buy our products in the below shops:</Typography>
            <ul>
                {(locations).map(part =>
                    <li>
                        {part.city}
                        {part.country}
                    </li>
                )}
            </ul>
        </Container>
    )

}