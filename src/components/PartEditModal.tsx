import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";
import { IPart } from "../Pages/Parts";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState } from "../App";

export default function PartEditModal() {

    const partEditModalOpen = useSelector((state: RootState) => state.modal.partEditModalOpen);
    const part = useSelector((state: RootState) => state.partData.partData);
    const dispatch = useDispatch();

    const [partData, setPartData] = useState<IPart>({
        _id: '',
        name: '',
        price: 0,
        manufacturer: '',
        tags: []
    })

    function resetPartData() {
        setPartData({
            _id: '',
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
            setPartData(part)
        }
    }, [part])

    useEffect(() => {
        axios.get('/parts/manufacturers')
            .then((response) => setManufacturers(response.data));
        axios.get('/tags')
            .then((response) => setTags(response.data))
    }, [])


    async function createNewPart(partData: IPart) {
        try {
            const response = await axios.post('/parts/new_part', partData);
            dispatch(setPartEditModalOpen(true));
            resetPartData()
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }

    useEffect(() => {
        console.log(partData)
    }, [partData])

    return (
        <Modal open={partEditModalOpen} onClose={() => setPartEditModalOpen(false)}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CardHeader title='Add new part' />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        <TextField
                            label='New part name'
                            value={partData.name}
                            onChange={(e) => setPartData({ ...partData, name: e.target.value })}
                        />
                        <TextField
                            label='Price'
                            value={partData.price}
                            type="number"
                            InputProps={{ endAdornment: <InputAdornment disableTypography position="end">PLN</InputAdornment> }}
                            onChange={(e) => setPartData({ ...partData, price: parseInt(e.target.value) })}
                        />
                        <Autocomplete
                            options={tags}
                            value={partData.tags}
                            getOptionLabel={(tag: ITag) => tag.name}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            renderInput={(params) => (
                                <TextField {...params} label="Tags" variant="outlined" />
                            )}
                            // freeSolo  // this needs to be disabled for now as I do not allow creating new tags here.
                            multiple
                            onChange={(e, v) => {
                                const newTags = v.map(tag => typeof tag === 'string' ? tags.find(t => t.name === tag) as ITag : tag);
                                setPartData({ ...partData, tags: newTags });
                            }}
                        />
                        <Autocomplete
                            options={[...new Set(manufacturers)]}
                            value={partData.manufacturer}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(p) => <TextField {...p} label="Manufacturer" />}
                            // freeSolo  // this needs to be disabled for now as I do not allow creating new tags here.
                            onChange={(e, v) => typeof v === 'string' ? setPartData({ ...partData, manufacturer: v }) : ''}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        {(part) ?
                            // this button should fire edit method instead of creation of new part
                            <Button onClick={() => createNewPart(partData)}>Edit part data</Button> 
                            :
                            <Button onClick={() => createNewPart(partData)}>Add new part</Button>
                        }
                        <Button onClick={() => dispatch(setPartEditModalOpen(false))}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}