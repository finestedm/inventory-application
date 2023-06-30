import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Typography } from "@mui/material";
import CardList from "../components/CardList";
import { useDispatch } from "react-redux";
import { setLocationEditModalOpen } from "../features/modalSlice";
import { ILocation } from "@/components/interfaces";

export default function Parts(): JSX.Element {

    const dispatch = useDispatch();

    // set initial states of catalogCounts with declared types of data
    const [locations, setLocations] = useState<ILocation[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // get data from server: number of elements in each category
    useEffect(() => {
        setIsLoading(true); // Set isLoading to true when fetching data

        axios.get('/locations')
            .then((response) => setLocations(response.data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false); // Set isLoading to false when data fetching is complete
            });
    }, [])

    return (
        <Container maxWidth='xl'>
            <Typography variant="h4">You can buy our products in the below shops:</Typography>
            <Button onClick={() => dispatch(setLocationEditModalOpen(true))}> Add new Shop </Button>
            <CardList locations={locations} perPage={4} placeholder={isLoading} />
        </Container>
    )

}