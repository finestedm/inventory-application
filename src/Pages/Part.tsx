import axios from "axios"
import { useEffect, useState } from "react"
import { IPart } from "./Parts"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Container, Skeleton, Box, Chip, useTheme, List, ListItem, ListItemText, ListItemButton, Stack, Divider, Menu, MenuItem } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IInventory } from "./Inventories";
import BuyButton from "../components/BuyButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from "react-redux";
import { setPartData, setPartEditModalOpen, setPartDeleteModalOpen } from "../App";
import deletePart from "../methods/deletePart";


export default function Part(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [part, setPart] = useState<IPart>()
    const [inventory, setInventory] = useState<IInventory[]>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/parts/${params.id}`)
            .then((response) => setPart(response.data))
        axios.get(`/availability/${params.id}`)
            .then((response) => setInventory(response.data))
    }, [])

    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const editMenuOpen = Boolean(anchorEl);
    const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    if (part && inventory) {
        return (
            <Container maxWidth='xl'>
                <Grid2 container sx={{ marginTop: 0 }} spacing={12}>
                    <Grid2 xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh', borderRadius: '.25rem' }} />
                    </Grid2>
                    <Grid2 xs={12} sm={6} position='relative'>

                        <Button sx={{ position: 'absolute', zIndex: 1000, right: 25 }} onClick={handleAnchorSetting}>
                            <MoreVertIcon sx={{ color: 'black' }} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={editMenuOpen}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                dispatch(setPartEditModalOpen(true))
                                dispatch(setPartData(part))
                            }
                            }>Edit</MenuItem>
                            <MenuItem onClick={() => { dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: true, partData: part }) ) }
                            }>Delete</MenuItem>
                        </Menu>

                        <Stack spacing={2}>
                            <Typography mb={2} variant='h4' sx={{ fontWeight: 500 }}> {part.name}</Typography >
                            <Divider />
                            <Typography color={theme.palette.grey[500]}> {part.manufacturer}</Typography >
                            <Divider />
                            <div style={{ display: 'flex' }}>
                                <Typography noWrap variant="h4"> {part.price.toFixed(2)} </Typography >
                                <Typography noWrap variant="h6" color={theme.palette.grey[500]}>PLN</Typography>
                            </div>
                            <Divider />
                            <Box>
                                <Typography gutterBottom> Categories: </Typography >
                                {part.tags.map(tag =>
                                    <Chip
                                        key={tag._id}
                                        href={`/catalog/tags/${tag.name}`}
                                        label={tag.name}
                                        component="a"
                                        clickable
                                    />
                                )}
                            </Box>
                            <Divider />
                            <Box>
                                <Typography> Availability: </Typography >
                                <List>
                                    {inventory.map(inventory => {
                                        return inventory.location
                                            ?
                                            <ListItem key={inventory._id}>
                                                <ListItemText>
                                                    {inventory.location.city}: {inventory.available}
                                                </ListItemText>
                                            </ListItem>
                                            :
                                            ''
                                    })}
                                </List>
                            </Box>
                            <Divider />
                            <BuyButton />
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container >
        )
    } else {
        return (
            <Box display="flex" alignItems='center' justifyContent='center' width={'100%'} height={300}>
                < CircularProgress />
            </Box>
        )
    }

}