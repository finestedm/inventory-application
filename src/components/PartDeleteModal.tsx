import { useDispatch, useSelector } from "react-redux";
import { RootState, setPartDeleteModalOpen } from "../features/modalSlide";
import { Button, Card, CardActionArea, CardContent, CardHeader, Modal, Stack } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import deletePart from "../methods/deletePart";


export default function PartDeleteModal(): JSX.Element {

    // read states 
    const partDeleteModalOpen = useSelector((state: RootState) => state.modal.partDeleteModalOpen);
    const partData = useSelector((state: RootState) => state.modal.partData);
    const dispatch = useDispatch();

    // set up navigation to move up one level if part deletion occurs on part screen
    const navigate = useNavigate()
    const location = useLocation();

    function checkAndNavUp() {
        const parts = location.pathname.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart === partData._id) {
            const newUrl = parts.slice(0, -1).join('/');
            navigate(newUrl)
        }
    }

    function handlePartDeletion() {
        deletePart(partData._id)
        dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: false }))
        checkAndNavUp()
    }

    return (
        <Modal open={partDeleteModalOpen} onClose={() => {
            dispatch(setPartDeleteModalOpen({ partDeleteModalOpen: false }))
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", p: 2 }}>
                <CardHeader title='Are you sure you want to delete the part?' />
                <CardActionArea>
                    <Stack spacing={1}>
                        <Button
                            color='error'
                            onClick={handlePartDeletion}
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