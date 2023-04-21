import axios from "axios"
import { useEffect, useState } from "react"
import { ITag } from "./Tags";
import { Button, Container, Typography } from "@mui/material";
import NewPartModal from "../components/PartEditModal";
import CardList from "../components/CardList";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setPartEditModalOpen } from "../features/modalSlide";

// declare types

export interface IPart {
    _id: string;
    name: string;
    manufacturer: string;
    price: number;
    tags: ITag[];
    createdAt?: Date
}

export default function Parts(): JSX.Element {

    const dispatch = useDispatch();

    // set initial states of catalogCounts with declared types of data
    const [parts, setParts] = useState<IPart[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/parts')
            .then((response) => setParts(response.data))
    }, [])

    return (
        <Container maxWidth='xl'>
            <Typography variant="h4">List of products sold in our stores</Typography>
            <Button onClick={() => dispatch(setPartEditModalOpen(true))}> Add new part </Button>
            <CardList parts={parts} />
        </Container>
    )

}