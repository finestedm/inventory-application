import { useDispatch, useSelector } from "react-redux";
import { RootState, setPartDeleteModalOpen } from "../App";
import { Button, Card, CardActionArea, CardContent, CardHeader, Modal, Stack } from "@mui/material";
import deletePart from "../methods/deletePart";

export default function PartDeleteModal(): JSX.Element {

    const partDeleteModalOpen = useSelector((state: RootState) => state.modal.partDeleteModalOpen);
    const partData = useSelector((state: RootState) => state.partData.partData);
    const dispatch = useDispatch();

    return (
        <Modal open={partDeleteModalOpen} onClose={() => {
            dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: false }))
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CardHeader title='Are you sure you want to delete the part?' />
                <CardActionArea>
                    <Stack spacing={1}>
                        <Button
                            color='error'
                            onClick={() => {
                                deletePart(partData._id)
                                dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: false }))
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: false }))
                            }}>
                            Cancel
                        </Button>
                    </Stack>
                </CardActionArea>
            </Card>
        </Modal>
    )
}