import axios from "axios"
import { useEffect, useState } from "react"
import { Button, CircularProgress, Container, Pagination, Stack, Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardList from "../components/CardList";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen } from "../features/modalSlice";
import { RootState } from "@/features/combineReducer";
import { IPart } from "@/components/interfaces";
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

export default function Parts(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [parts, setParts] = useState<IPart[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(
        Number(new URLSearchParams(window.location.search).get('page')) || 1
    );
    const [totalPages, setTotalPages] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(4);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //retrieve data from url
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const page = Number(queryParams.get('page')) || 1;
        const limit = Number(queryParams.get('limit')) || 4;

        setCurrentPage(page);
        setPerPage(limit);
    }, []);


    const fetchParts = () => {
        setIsLoading(true);
        const queryParams = qs.stringify({
            page: currentPage,
            limit: perPage,
        });

        axios
            .get(`/parts?${queryParams}`)
            .then((response) => {
                const { partsData, totalCount } = response.data;
                setParts(partsData);
                setTotalPages(Math.ceil(totalCount / perPage));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        //this part changes value of page in URL
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('limit', perPage.toString());
        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}?${queryParams.toString()}`
        );
        // this one fetches parts on both below parameters change
        fetchParts();
    }, [currentPage, perPage]);


    return (
        <Container maxWidth='xl' sx={{ py: '2rem' }}>
            <Stack spacing={2}>
                <Typography variant="h4">List of products sold in our stores</Typography>
                <Stack direction='row' flex={1} justifyContent='space-between'>
                    <Button variant="outlined" onClick={() => dispatch(setPartEditModalOpen(true))}> Add new part </Button>
                    <PerPageDropdown perPage={perPage} setPerPage={setPerPage} />
                </Stack>

                <CardList parts={parts} perPage={perPage} placeholder={isLoading} />

                <Pagination
                    sx={{ width: '100%' }}
                    count={totalPages}
                    page={currentPage}
                    shape="rounded"
                    onChange={(event, page) => {
                        let queryParams = '';
                        if (page > 1) {
                            queryParams = qs.stringify({ page, limit: perPage });
                        }
                        navigate(`/catalog/parts${queryParams ? `?${queryParams}` : ''}`);
                        setCurrentPage(page);
                    }}
                />
            </Stack>
        </Container>
    )
}

function PerPageDropdown({ perPage, setPerPage }: { perPage: number, setPerPage: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <FormControl variant="outlined" size="small" sx={{ minWidth: '16ch' }}>
            <InputLabel>Items per page</InputLabel>
            <Select
                value={perPage}
                onChange={e => {
                    setPerPage(Number(e.target.value))
                }}
                label="Items per page"
            >
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={32}>32</MenuItem>
            </Select>
        </FormControl>
    );
};