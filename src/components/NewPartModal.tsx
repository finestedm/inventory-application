import { Modal , Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete} from "@mui/material";
import { useState } from "react";


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

    return (
        <Modal open={newPartModalOpen} onClose={() => setNewPartModalOpen(false)}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CardHeader title='Add new part' />
                <CardContent>
                <FormControl>
                    <TextField
                        label='New part name'
                        value={newPartData.name}
                    />
                    <TextField
                        label='Price'
                        value={newPartData.price}    
                        InputProps={{endAdornment: <InputAdornment disableTypography position="end">PLN</InputAdornment>}}
                    />
                    <Autocomplete
                        options={['a', 'b', 'c']}
                        renderInput={(p) => <TextField {...p} label="Tags" />}
                        freeSolo
                        multiple
                    />
                    <Autocomplete
                        options={['a', 'b', 'c']}
                        renderInput={(p) => <TextField {...p} label="Manufacturer" />}
                        freeSolo
                    />
                </FormControl>
                </CardContent>
            </Card>
        </Modal>
    )
}