import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag, IPart, IError } from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setPartData } from "../../features/modalSlide";

export default function PartEditModal() {

    const partEditModalOpen = useSelector((state: RootState) => state.modal.partEditModalOpen);
    const partData = useSelector((state: RootState) => state.modal.partData);
    const dispatch = useDispatch();

    const [manufacturers, setManufacturers] = useState([])
    const [tags, setTags] = useState<ITag[]>([])
    const [errors, setErrors] = useState<IError[]>([])

    const [newTagInput, setNewTagInput] = useState("");

    

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
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors)
            // throw new Error();
        }
    }

    async function editPart(partData: IPart) {
        try {
            const response = await axios.post(`/parts/edit_part`, partData)
            dispatch(setPartEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors)
        }
    }

    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z0-9-_\s]+$/;

    function handleNewTagInput(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const value = e.target.value;
        // @ts-ignore
        if (e.nativeEvent.data === ' ') {
            if (!partData.tags.map(tag => tag.name.toLowerCase()).includes(newTagInput.toLowerCase())) {
                dispatch(setPartData({
                    ...partData,
                    tags: [...partData.tags, { name: newTagInput }],
                }));
            } else {
                e.target.blur();
                e.target.focus();
            }
        } else if (value !== "" && !ALPHA_NUMERIC_DASH_REGEX.test(value)) {
            return
        } else {
            setNewTagInput(value)
        }
    }

    return (
        <Modal open={partEditModalOpen} onClose={() => {
            dispatch(setPartEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Add new part' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2} >
                        <TextField
                            label='New part name'
                            value={partData.name}
                            helperText={(errors.filter(error => error.param === 'name')).map(msg => msg.msg).join(' • ')}
                            onChange={(e) => {
                                dispatch(setPartData({ ...partData, name: e.target.value }))
                                setErrors(errors.filter(error => error.param !== 'name'))
                            }}
                            error={(partData.name.length < 2) || (partData.name.length > 50) || (errors.filter(error => error.param === 'name').length > 0)}
                        />
                        <TextField
                            label='Price'
                            value={partData.price}
                            helperText={(errors.filter(error => error.param === 'price')).map(msg => msg.msg).join(' • ')}
                            type="number"
                            error={(partData.price > 999999) || (partData.price < 0.01) || (errors.filter(error => error.param === 'price').length > 0) ? true : false}
                            InputProps={{
                                inputProps: {
                                    step: 0.01,
                                    min: 0.01,
                                    max: 999999,
                                },
                                endAdornment: <InputAdornment disableTypography position="end">PLN</InputAdornment>
                            }}
                            onChange={(e) => {
                                dispatch(setPartData({ ...partData, price: parseFloat(e.target.value) }))
                                setErrors(errors.filter(error => error.param !== 'price'))
                            }}

                        />
                        <Autocomplete
                            clearOnBlur={true}
                            options={tags}
                            value={partData.tags}
                            getOptionLabel={(option: string | ITag) => {
                                if (typeof option === 'string') {
                                    return option;
                                } else {
                                    return option.name;
                                }
                            }}
                            // @ts-ignore
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Tags"
                                    value={newTagInput}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            newTagInput !== '' && handleNewTagInput(e)
                                            e.stopPropagation();
                                        }
                                    }}
                                    onChange={e => handleNewTagInput(e)}
                                    variant="outlined"
                                    helperText={(errors.filter(error => error.param === 'tag')).map(msg => msg.msg).join(' • ')}
                                />
                            )}
                            freeSolo  // this needs to be disabled for now as I do not allow creating new tags here.
                            multiple
                            onChange={(e, v) => {
                                const newTags = v.map(tag => typeof tag === 'string' ? tags.find(t => t.name === tag) as ITag : tag);
                                dispatch(setPartData({ ...partData, tags: newTags }));
                                setErrors(errors.filter(error => error.param !== 'tags'))
                            }}

                        />
                        <Autocomplete
                            options={manufacturers}
                            inputValue={partData.manufacturer}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(p) => (
                                <TextField {...p}
                                    label="Manufacturer"
                                    helperText={(errors.filter(error => error.param === 'manufacturer')).map(msg => msg.msg).join(' • ')}
                                    error={(partData.manufacturer.length < 2) || (partData.manufacturer.length > 50) || (errors.filter(error => error.param === 'manufacturer').length > 0)}
                                />
                            )}
                            freeSolo
                            onInputChange={(e, v) => {
                                dispatch(setPartData({ ...partData, manufacturer: v }))
                                setErrors(errors.filter(error => error.param !== 'manufacturer'))
                            }}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        {(partData._id) ?
                            <Button onClick={() => editPart(partData)}>Edit part data</Button>
                            :
                            <Button onClick={() => createNewPart(partData)}>Add new part</Button>
                        }
                        <Button onClick={() => { dispatch(setPartEditModalOpen(false)) }
                        }>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}