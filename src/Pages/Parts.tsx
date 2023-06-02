import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Pagination, Typography } from "@mui/material";
import NewPartModal from "../components/Modals/PartEditModal";
import CardList from "../components/CardList";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setPartEditModalOpen } from "../features/modalSlide";
import { IPart } from "@/components/interfaces";

export default function Parts(): JSX.Element {

    const dispatch = useDispatch();

    const [parts, setParts] = useState<IPart[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const perPage = 2; // Number of items per page

    const fetchParts = () => {
        axios
            .get(`/parts?page=${currentPage}&limit=${perPage}`)
            .then((response) => {
                const { partsData, totalCount } = response.data;
                setParts(partsData);
                setTotalPages(Math.ceil(totalCount / perPage));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchParts();
    }, [currentPage]);


    return (
        <Container maxWidth='xl'>
            <Typography variant="h4">List of products sold in our stores</Typography>
            <Button onClick={() => dispatch(setPartEditModalOpen(true))}> Add new part </Button>
            <CardList parts={parts} />
            <Pagination
                sx={{ width: '100%' }}
                count={totalPages}
                page={currentPage}
                shape="rounded"
                onChange={(event, page) => setCurrentPage(page)}
            />
        </Container>
    )

}