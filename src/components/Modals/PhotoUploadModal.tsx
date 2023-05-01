import { RootState, setPartData, setPhotoData, setPhotoUploadModalOpen } from "@/features/modalSlide"
import { Button, Card, CardContent, CardHeader, FormControl, Input, Modal, Stack } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IError, IPart } from "../interfaces";
import axios from "axios";

export default function PhotoUploadModal() {

    const photoUploadModalOpen = useSelector((state: RootState) => state.modal.photoUploadModalOpen);
    const partData = useSelector((state: RootState) => state.modal.partData);
    const photoData = useSelector((state: RootState) => state.modal.photoData);
    const dispatch = useDispatch();

    async function editPart(partData: IPart) {
        try {
            const response = await axios.post(`/parts/edit_part`, partData)
            dispatch(setPhotoUploadModalOpen(false));
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors)
        }
    }

    const [errors, setErrors] = useState<IError[]>([])

    return (
        <Modal open={photoUploadModalOpen} onClose={() => {
            dispatch(setPhotoUploadModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Upload new photo' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        <input
                            type="file"
                            name="parts-photo"
                            accept={".jpg"}
                            multiple={false}
                            onInputCapture={e => {
                                setPhotoData(e.target.files[0])
                                console.log(photoData)
                            }}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button
                        // onClick={() => editPart(partData)}
                        >Change part's photo
                        </Button>
                        <Button onClick={() => { dispatch(setPhotoUploadModalOpen(false)) }
                        }>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}