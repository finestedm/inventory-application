import axios from "axios"
import { useEffect, useState } from "react"
import { Button, CircularProgress, Container, Pagination, Stack, Typography, responsiveFontSizes } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardList from "../components/CardList";
import { IPart } from "@/components/interfaces";
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

export default function SearchResults(): JSX.Element {

    const navigate = useNavigate();

    const [parts, setParts] = useState<IPart[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(
        Number(new URLSearchParams(window.location.search).get('page')) || 1
    );
    const [totalPages, setTotalPages] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(4);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    //retrieve data from url
    useEffect(() => {
        setParamsBasedOnUrl()
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted) {
            fetchParts();
        }
    }, [perPage, searchQuery, currentPage, hasMounted])

    function setParamsBasedOnUrl() {
        const queryParams = new URLSearchParams(window.location.search);
        const page = Number(queryParams.get('page')) || 1;
        const limit = Number(queryParams.get('limit')) || 4;
        const query = queryParams.get('query') || '';
        setCurrentPage(page);
        setPerPage(limit);
        setSearchQuery(query);
    }

    const fetchParts = () => {
        setIsLoading(true);
        const queryParams = qs.stringify({
            page: currentPage,
            limit: perPage,
            query: searchQuery,
        });

        axios
            .get(`/parts?${queryParams}`)
            .then((response) => {
                const { partsData, totalCount } = response.data;
                if (response.status === 200) {  // if all ok
                    console.log(200)
                    setParts(partsData);
                    setTotalPages(Math.ceil(totalCount / perPage));
                } else if (response.status === 204) {   // no results
                    console.log(204)
                    setParts([])
                    setTotalPages(0);
                }
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
        setParamsBasedOnUrl()
    }, [window.location.search]);

    return (
        <Container maxWidth='xl' sx={{ py: '2rem' }}>
            <Stack spacing={2}>
                <Typography variant="h4">List of products sold in our stores</Typography>
                <Stack direction='row' flex={1} justifyContent='space-between'>
                    <Button variant="outlined" onClick={() => navigate(`/catalog/parts`)}> Show all </Button>
                    <PerPageDropdown perPage={perPage} setPerPage={setPerPage} />
                </Stack>

                {parts.length > 0 ?
                    <CardList parts={parts} perPage={perPage} placeholder={isLoading} />
                    :
                    <h1>Nothing Found :( </h1>
                }
                <Pagination
                    sx={{ width: '100%' }}
                    count={totalPages}
                    page={currentPage}
                    shape="rounded"
                    onChange={(event, page) => {
                        let queryParams = '';
                        if (page > 1) {
                            queryParams = qs.stringify({ page, ...(perPage !== 4 && { limit: perPage }), ...(searchQuery && { query: searchQuery }) });
                        }
                        navigate(`/catalog/search${queryParams ? `?${queryParams}` : ''}`);
                        setCurrentPage(page);
                    }}
                />

            </Stack>
        </Container >
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