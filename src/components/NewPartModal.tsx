import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";
import { IPart } from "../Pages/Parts";
import { useSelector, useDispatch } from "react-redux";
import { setNewPartModalOpen, RootState } from "../App";

export default function NewPartModal() {

    const newPartModalOpen = useSelector((state: RootState) => state.modal.newPartModalOpen);
    const part = useSelector((state: RootState) => state.newPartData.newPartData);
    const dispatch = useDispatch();

    const [newPartData, setNewPartData] = useState<IPart>({
        name: '',
        price: 0,
        manufacturer: '',
        tags: []
    })

    function resetNewPartData() {
        setNewPartData({
            name: '',
            price: 0,
            manufacturer: '',
            tags: []
        });
    }

    const [manufacturers, setManufacturers] = useState([])
    const [tags, setTags] = useState<ITag[]>([])

    console.log(part)
    // if part is edited instead of created then populate partData with the props data passed
    useEffect(() => {
        if (part) {
            setNewPartData(part)
        }
    }, [part])

    useEffect(() => {
        axios.get('/parts/manufacturers')
            .then((response) => setManufacturers(response.data));
        axios.get('/tags')
            .then((response) => setTags(response.data))
    }, [])


    async function createNewPart(newPartData: IPart) {
        try {
            const response = await axios.post('/parts/new_part', newPartData);
            dispatch(setNewPartModalOpen(true));
            resetNewPartData()
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }

    useEffect(() => {
        console.log(newPartData)
    }, [newPartData])

    return (
        <Modal open={newPartModalOpen} onClose={() => setNewPartModalOpen(false)}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CardHeader title='Add new part' />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        <TextField
                            label='New part name'
                            value={newPartData.name}
                            onChange={(e) => setNewPartData({ ...newPartData, name: e.target.value })}
                        />
                        <TextField
                            label='Price'
                            value={newPartData.price}
                            type="number"
                            InputProps={{ endAdornment: <InputAdornment disableTypography position="end">PLN</InputAdornment> }}
                            onChange={(e) => setNewPartData({ ...newPartData, price: parseInt(e.target.value) })}
                        />
                        <Autocomplete
                            options={tags}
                            value={newPartData.tags}
                            getOptionLabel={(tag: string | ITag) => typeof tag === 'string' ? tag : tag.name}
                            renderInput={(params) => (
                                <TextField {...params} label="Tags" variant="outlined" />
                            )}
                            // freeSolo  // this needs to be disabled for now as I do not allow creating new tags here.
                            multiple
                            onChange={(e, v) => {
                                const newTags = v.map(tag => typeof tag === 'string' ? tags.find(t => t.name === tag) as ITag : tag);
                                setNewPartData({ ...newPartData, tags: newTags });
                            }}
                        />
                        <Autocomplete
                            options={[...new Set(manufacturers)]}
                            value={newPartData.manufacturer}
                            renderInput={(p) => <TextField {...p} label="Manufacturer" />}
                            // freeSolo  // this needs to be disabled for now as I do not allow creating new tags here.
                            onChange={(e, v) => typeof v === 'string' ? setNewPartData({ ...newPartData, manufacturer: v }) : ''}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        {(part) ?
                            // this button should fire edit method instead of cretion of new part
                            <Button onClick={() => createNewPart(newPartData)}>Edit part data</Button> 
                            :
                            <Button onClick={() => createNewPart(newPartData)}>Add new part</Button>
                        }
                        <Button onClick={() => dispatch(setNewPartModalOpen(false))}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}