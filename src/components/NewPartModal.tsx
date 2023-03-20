import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";


export default function NewPartModal(props: { newPartModalOpen: boolean, setNewPartModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { newPartModalOpen, setNewPartModalOpen } = props

    interface INewPartData {
        name: string;
        price: number;
        manufacturer: string;
        tags: string[]
    }

    const [newPartData, setNewPartData] = useState<INewPartData>({
        name: '',
        price: 0,
        manufacturer: '',
        tags: []
    })

    const [manufacturers, setManufacturers] = useState([])
    const [tags, setTags] = useState<ITag[]>([])


    useEffect(() => {
        axios.get('/parts/manufacturers')
            .then((response) => setManufacturers(response.data));
        axios.get('/tags')
            .then((response) => setTags(response.data))
    }, [])

    // useEffect(() => {
    //     console.log(tags.map((k, v)=> tags[v].name))
    // }, [tags])

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
                            options={tags.map((k, v)=> tags[v].name)}
                            renderInput={(p) => <TextField {...p} label="Tags" />}
                            freeSolo
                            multiple
                        />
                        <Autocomplete
                            options={manufacturers}
                            renderInput={(p) => <TextField {...p} label="Manufacturer" />}
                            freeSolo
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button>Add new part</Button>
                        <Button>Cancel  </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}