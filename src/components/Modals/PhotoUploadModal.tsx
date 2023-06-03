import { RootState, setPartData, setPhotoData, setPhotoUploadModalOpen } from "@/features/modalSlide"
import { Button, Card, CardContent, CardHeader, FormControl, Input, Modal, Stack } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IError, IPart } from "../interfaces";
import axios from "axios";

export default function PhotoUploadModal() {

    const photoUploadModalOpen = useSelector((state: RootState) => state.modal.photoUploadModalOpen);
    const partData = useSelector((state: RootState) => state.modal.partData);
    // const photoData = useSelector((state: RootState) => state.modal.photoData);
    const [photoData, setPhotoData] = useState<File | null>(null)
    const dispatch = useDispatch();

    async function editPartPhoto() {
        try {
            const formData = new FormData();
            photoData && formData.append('partPhoto', photoData)
            partData._id && formData.append('partId', partData._id)
            console.log('here I am')
            const response = await axios.post(`/parts/upload_part_photo`, formData)
            dispatch(setPhotoUploadModalOpen(false));
            return response.data;
        } catch (error: any) {
            console.log(error)
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
                    {photoData &&
                        <img
                            src={URL.createObjectURL(photoData)}
                            alt="Uploaded Image"
                            style={{ width: 'max(25vw, 500px)', borderRadius: '1rem' }}
                        />
                    }
                    <FormControl component={Stack} spacing={2}>
                        <input
                            type="file"
                            name="parts-photo"
                            accept=".jpg,.jpeg,.png,.webp"
                            multiple={false}
                            onInputCapture={e => {
                                // @ts-ignore
                                const file = e.target.files[0];
                                setPhotoData(file)
                            }}
                        />
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button
                            onClick={() => editPartPhoto()}
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