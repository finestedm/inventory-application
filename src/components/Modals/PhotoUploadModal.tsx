import { RootState, setPhotoUploadModalOpen } from "@/features/modalSlide"
import { Button, Card, CardContent, CardHeader, FormControl, Input, Modal, Stack } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IError } from "../interfaces";

export default function PhotoUploadModal() {

    const photoUploadModalOpen = useSelector((state: RootState) => state.modal.photoUploadModalOpen);
    const photoData = useSelector((state: RootState) => state.modal.photoData);
    const dispatch = useDispatch();

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
                        <Input type="file" />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button
                        // onClick={() => createNewPart(partData)}
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