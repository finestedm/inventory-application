import axios from "axios"
import { useEffect, useState } from "react"
import { IPart, IInventory, ILocation } from "@/components/interfaces"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Grid, Container, Skeleton, Box, Chip, useTheme, List, ListItem, ListItemText, ListItemButton, Stack, Divider, Menu, MenuItem, LinearProgress, Tooltip } from "@mui/material";
import BuyButton from "../components/BuyButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { setPartData, setPartEditModalOpen, setPartDeleteModalOpen, setPhotoUploadModalOpen, setInventoryData, setInventoryEditModalOpen } from "../features/modalSlice";
import { RootState } from "@/features/combineReducer";
// @ts-ignore
import { imagefrombuffer } from 'imagefrombuffer'
import { StoreRounded, WarehouseRounded } from "@mui/icons-material";
import { v4 as uuid } from 'uuid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Part(): JSX.Element {

    const params = useParams();

    const [tempInventory, setTempInventory] = useState<IInventory[]>([])
    const [locations, setLocations] = useState<ILocation[]>([])
    const inventoryData = useSelector((state: RootState) => state.modal.inventoryData);
    const partData = useSelector((state: RootState) => state.modal.partData)
    const [photoUrl, setPhotoUrl] = useState<string>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/parts/${params.id}`)
            .then((response) => dispatch(setPartData(response.data)))
        axios.get(`/availability/${params.id}`)
            .then((response) => setTempInventory(response.data))
        axios.get('/locations')
            .then((response) => setLocations(response.data))
    }, [])

    useEffect(() => {
        const updatedInventoryData = locations.map((location) => {
            return getInventoryForLocation(location);
        });
        dispatch(setInventoryData(updatedInventoryData))
    }, [tempInventory, locations])

    const theme = useTheme()

    // PartEditMenu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const editMenuOpen = Boolean(anchorEl);
    const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // photoUploadMenu
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const photoUploadMenuOpen = Boolean(anchorEl2);
    const handleAnchorSetting2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    // InventoryEditMenu
    const [anchorEl3, setAnchorEl3] = useState<null | HTMLElement>(null);
    const inventoryMenuOpen = Boolean(anchorEl3);
    const handleAnchorSetting3 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl3(event.currentTarget);
    };

    const dispatch = useDispatch();

    function getInventoryForLocation(location: ILocation) {
        const existingInventory = tempInventory.find(inv => inv.location?._id === location._id);
        if (existingInventory) {
            return existingInventory;
        } else {
            return {
                location: location,
                available: 0,
                part: partData
            };
        }
    };

    useEffect(() => {
        if (partData.photo) {
            const blob = new Blob([Uint8Array.from(partData.photo.data.data)], { type: partData.photo.contentType });
            const imageUrl = URL.createObjectURL(blob);
            setPhotoUrl(imageUrl)
        }
    }, [partData.photo])

    // const imageUrl = `data:${partData.photo.contentType};base64,${Buffer.from(partData.photo.data).toString('base64')}`;

    if (partData && inventoryData) {
        return (
            <Container maxWidth='xl' sx={{ my: 5 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative', aspectRatio: '1/1', maxHeight: '70vh' }}>

                        {photoUrl ?
                            <Box
                                sx={{ width: '100%', height: '100%', borderRadius: '.25rem', backgroundColor: 'white' }}
                            >
                                <img
                                    style={{ objectFit: 'contain', height: '100%', width: '100%', borderRadius: '.5rem' }}
                                    src={photoUrl}
                                />
                            </Box>
                            :
                            <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', borderRadius: '.5rem' }} />
                        }
                        <Button sx={{ position: 'absolute', zIndex: 1000, right: 0, top: 50 }} onClick={handleAnchorSetting2}>
                            <MoreVertIcon sx={{ color: 'black' }} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl2}
                            open={photoUploadMenuOpen}
                            onClose={() => setAnchorEl2(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                dispatch(setPhotoUploadModalOpen(true))
                            }
                            }>Change photo</MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item xs={12} sm={6} position='relative'>

                        <Button sx={{ position: 'absolute', zIndex: 1000, right: 0 }} onClick={handleAnchorSetting}>
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
                            }
                            }>Edit</MenuItem>
                            <MenuItem onClick={() => { dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: true })) }
                            }>Delete</MenuItem>
                        </Menu>

                        <Stack spacing={2}>
                            <Typography mb={2} variant='h4' sx={{ fontWeight: 500, mb: 0 }}> {partData.name}</Typography >
                            {/* <Divider /> */}
                            <Typography color={theme.palette.grey[500]}> {partData.manufacturer}</Typography >
                            <Divider />
                            <div style={{ display: 'flex' }}>
                                <Typography noWrap variant="h4"> {partData.price.toFixed(2)} </Typography >
                                <Typography noWrap variant="h6" color={theme.palette.grey[500]}>PLN</Typography>
                            </div>
                            <Divider />
                            <Box>
                                <Typography gutterBottom> Categories: </Typography >
                                <Stack direction='row' spacing={2}>
                                    {partData.tags.map(tag =>
                                        <Chip
                                            key={tag._id}
                                            href={`/catalog/tags/${tag.name}`}
                                            label={tag.name}
                                            component="a"
                                            clickable
                                        />
                                    )}
                                </Stack>
                            </Box>
                            <Divider />
                            <Box sx={{ position: 'relative' }}>
                                <Typography> Availability: </Typography>
                                <Button sx={{ position: 'absolute', zIndex: 1000, right: 0, top: 0 }} onClick={handleAnchorSetting3}>
                                    <MoreVertIcon sx={{ color: 'black' }} />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl3}
                                    open={inventoryMenuOpen}
                                    onClose={() => setAnchorEl3(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        dispatch(setInventoryEditModalOpen(true))
                                    }
                                    }>Edit availability</MenuItem>
                                </Menu>
                                {(inventoryData) ?
                                    (
                                        <InventoryCounter key={uuid()} inventoryData={inventoryData} />
                                    )
                                    :
                                    <Typography variant="h5">Product unavailable</Typography>
                                }
                            </Box>
                            <Divider />
                            <BuyButton />
                        </Stack>
                    </Grid>
                </Grid>
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

function InventoryCounter({ inventoryData }: { inventoryData: IInventory[] }): JSX.Element {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {inventoryData.map((inventory) => (
                        <TableRow key={inventory._id}>
                            <TableCell>
                                {inventory.location?.city === 'Magazyn Centralny' ? (
                                    <WarehouseRounded />
                                ) : (
                                    <StoreRounded />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body1" color="initial">
                                    {inventory.location?.city}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: '50%' }}>
                                <Tooltip
                                    title={
                                        inventory.available > 0
                                            ? `Available: ${inventory.available}`
                                            : 'Waiting for delivery'
                                    }
                                    disableInteractive
                                    placement="left"
                                >
                                    <LinearProgress
                                        sx={{
                                            height: 6,
                                            borderRadius: '1rem',
                                            opacity: `${inventory.available === 0 ? '35%' : '100%'}`,
                                        }}
                                        variant="determinate"
                                        color={
                                            inventory.available <= 5
                                                ? 'error'
                                                : inventory.available <= 15
                                                    ? 'warning'
                                                    : inventory.available <= 25
                                                        ? 'info'
                                                        : 'success'
                                        }
                                        value={inventory.available > 100 ? 100 : inventory.available}
                                    />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}