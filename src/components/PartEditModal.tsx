import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";
import { IPart } from "../Pages/Parts";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setPartData } from "../App";

export default function PartEditModal() {

    const partEditModalOpen = useSelector((state: RootState) => state.modal.partEditModalOpen);
    const partData = useSelector((state: RootState) => state.partData.partData);
    const dispatch = useDispatch();

    const [manufacturers, setManufacturers] = useState([])
    const [tags, setTags] = useState<ITag[]>([])


    useEffect(() => {
        axios.get('/parts/manufacturers')
            .then((response) => setManufacturers(response.data));
        axios.get('/tags')
            .then((response) => setTags(response.data))
    }, [])


    async function createNewPart(partData: IPart) {
        try {
            const response = await axios.post('/parts/new_part', partData);
            dispatch(setPartEditModalOpen(false));
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            console.log(error.response?.data.errors)
            // throw new Error();
        }
    }

    async function editPart(partData: IPart) {
        try {
            const response = await axios.post(`/parts/edit_part`, partData)
            dispatch(setPartEditModalOpen(false));
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw new Error();
        }
    }

    // useEffect(() => {
    //     console.log(partData)
    // }, [partData])

    return (
        <Modal open={partEditModalOpen} onClose={() => setPartEditModalOpen(false)}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CardHeader title='Add new part' />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        <TextField
                            label='New part name'
                            value={partData.name}
                            onChange={(e) => dispatch(setPartData({ ...partData, name: e.target.value }))}
                            error={(partData.name.length < 1) || (partData.name.length > 50)}
                        />
                        <TextField
                            label='Price'
                            value={partData.price}
                            type="number"
                            error={(partData.price > 999999) || (partData.price < 0.01)}
                            InputProps={{
                                inputProps: {
                                    step: 0.01,
                                    min: 0.01,
                                    max: 999999,
                                    endAdornment: <InputAdornment disableTypography position="end">PLN</InputAdornment>
                                },
                            }}
                            onChange={(e) => dispatch(setPartData({ ...partData, price: parseInt(e.target.value) }))}
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
                                dispatch(setPartData({ ...partData, tags: newTags }));
                            }}
                        />
                        <Autocomplete
                            options={manufacturers}
                            value={partData.manufacturer}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(p) => (
                                <TextField {...p}
                                    label="Manufacturer"
                                    error={partData.manufacturer.length < 1 || partData.manufacturer.length > 50}
                                />
                            )}
                            freeSolo
                            onChange={(e, v) => typeof v === 'string' ? dispatch(setPartData({ ...partData, manufacturer: v })) : ''}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        {(partData._id) ?
                            // this button should fire edit method instead of creation of new part
                            <Button onClick={() => editPart(partData)}>Edit part data</Button>
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