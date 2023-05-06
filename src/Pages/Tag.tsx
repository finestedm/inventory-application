import axios from "axios"
import { useEffect, useState } from "react"
import { ITag, IPart } from "@/components/interfaces";
import { useParams } from "react-router-dom";
import CardList from "../components/CardList";
import { Button, Container, Menu, MenuItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setTagDeleteModalOpen } from "@/features/modalSlide";


export default function Tag(): JSX.Element {

    const params = useParams();
    const dispatch = useDispatch();

    // set initial states tag and parts which use this tag
    const [tag, setTag] = useState<ITag>()
    const [partsTagged, setPartsTagged] = useState<IPart[]>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const editMenuOpen = Boolean(anchorEl);
    const handleAnchorSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/tags/${params.name}`)
            .then((response) => {
                setTag(response.data.tag);
                setPartsTagged(response.data.partsTagged);
                console.log(response.data.partsTagged)
            })
    }, [])

    return (
        <Container maxWidth='xl' sx={{ py: 5 }}>
            {tag &&
                <div style={{ display: 'flex', position: 'relative' }}>
                    <Typography noWrap variant="h4" sx={{ marginRight: '.5rem' }}>Browse parts tagged with: </Typography>
                    <Typography noWrap variant="h4" sx={{ fontWeight: 700 }} color='primary'>#{tag.name}</Typography>
                    <Button sx={{ zIndex: 1000, right: 0, position: 'absolute' }} onClick={handleAnchorSetting}>
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
                        <MenuItem
                            onClick={() => { dispatch(setTagDeleteModalOpen({ tagDeleteModalOpen: true, tagData: tag })) }}
                        >Delete</MenuItem>
                    </Menu>
                </div>}
            {partsTagged && <CardList parts={partsTagged} />}
        </Container>
    )

}