import { RootState, setTagEditModalOpen, setTagData } from "@/features/modalSlide";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IError } from "../interfaces";
import axios from "axios";
import { ITag } from "@/Pages/Tags";
import { Button, Card, CardContent, CardHeader, FormControl, Modal, Stack, TextField } from "@mui/material";

export default function TagEditModal() {
    const tagEditModalOpen = useSelector((state: RootState) => state.modal.tagEditModalOpen)
    const tagData = useSelector((state: RootState) => state.modal.tagData)
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError[]>([])

    // useEffect(() => {
    //     axios.get('')
    // })

    async function createNewTag(tagData: ITag) {
        try {
            const response = await axios.post(`/tags/new_tag`, tagData)
            dispatch(setTagEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <Modal open={tagEditModalOpen} onClose={() => {
            dispatch(setTagEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Add new tag' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        <TextField
                            label='New tag'
                            value={tagData.name}
                            helperText={(errors.filter(error => error.param === 'name')).map(msg => msg.msg).join(' • ')}
                            onChange={(e) => {
                                dispatch(setTagData({ ...tagData, name: e.target.value }))
                                setErrors(errors.filter(error => error.param !== 'name'))
                            }}
                            error={(tagData.name.length < 2) || (tagData.name.length > 50) || (errors.filter(error => error.param === 'name').length > 0)}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button onClick={() => createNewTag(tagData)}>Add new tag</Button>
                        <Button onClick={() => { dispatch(setTagEditModalOpen(false)) }}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>

        </Modal>
    )

}