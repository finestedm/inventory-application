import { Modal , Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment} from "@mui/material";


export default function NewPartModal(props: { newPartModalOpen: boolean, setNewPartModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { newPartModalOpen, setNewPartModalOpen } = props
    console.log(props)
    return (
        <Modal open={newPartModalOpen} onClose={() => setNewPartModalOpen(false)}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CardHeader title='Add new part' />
                <CardContent>
                <FormControl>
                    <TextField
                        label='New part name'
                    />
                    <TextField
                        label='Price'
                        InputProps={{endAdornment: <InputAdornment disableTypography position="end">PLN</InputAdornment>}}
                    />     
                </FormControl>
                </CardContent>
            </Card>
        </Modal>
    )
}