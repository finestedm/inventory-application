import axios from "axios"
import { useEffect, useState } from "react"
import { IPart, IInventory } from "@/components/interfaces"
import { useParams } from "react-router-dom"
import { Typography, CircularProgress, Button, Grid, Container, Skeleton, Box, Chip, useTheme, List, ListItem, ListItemText, ListItemButton, Stack, Divider, Menu, MenuItem } from "@mui/material";
import BuyButton from "../components/BuyButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from "react-redux";
import { setPartData, setPartEditModalOpen, setPartDeleteModalOpen, setPhotoUploadModalOpen, setInventoryData, setInventoryEditModalOpen } from "../features/modalSlide";
// @ts-ignore
import { imagefrombuffer } from 'imagefrombuffer'

export default function Part(): JSX.Element {

    const params = useParams();

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

    if (part && inventory) {
        return (
            <Container maxWidth='xl' sx={{ my: 5 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative', aspectRatio: '1/1', maxHeight: '70vh' }}>

                        {part.photo ?

                            <Box
                                sx={{ width: '100%', height: '100%', borderRadius: '.25rem' }}
                            >
                                <img
                                    style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: '.5rem' }}
                                    src={imagefrombuffer({
                                        type: part.photo.contentType, // example image/jpeg 
                                        data: part.photo.data.data, // array buffer data 
                                    })}
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
                                dispatch(setPartData(part))
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
                                dispatch(setPartData(part))
                            }
                            }>Edit</MenuItem>
                            <MenuItem onClick={() => { dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: true, partData: part })) }
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
                                        console.log(inventory)
                                        dispatch(setInventoryEditModalOpen(true))
                                        dispatch(setInventoryData(inventory))
                                    }
                                    }>Edit availability</MenuItem>
                                </Menu>
                                <List>
                                    {inventory.map(inventory => {
                                        return inventory.location
                                            &&
                                            <InventoryCounter inventory={inventory} />
                                    })}
                                </List>
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

function InventoryCounter({ inventory }: { inventory: IInventory }): JSX.Element {
    return (
        <ListItem key={inventory._id}>
            <ListItemText>
                {inventory.location?.city}: {inventory.available}
            </ListItemText>
        </ListItem>
    )
}