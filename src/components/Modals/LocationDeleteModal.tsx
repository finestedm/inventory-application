import { useDispatch, useSelector } from "react-redux";
import { RootState, setLocationDeleteModalOpen } from "../../features/modalSlide";
import { Button, Card, CardActionArea, CardContent, CardHeader, Modal, Stack } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import deleteLocation from "../../methods/deleteLocation";


export default function LocationDeleteModal(): JSX.Element {

    // read states 
    const locationDeleteModalOpen = useSelector((state: RootState) => state.modal.locationDeleteModalOpen);
    const locationData = useSelector((state: RootState) => state.modal.locationData);
    const dispatch = useDispatch();

    // set up navigation to move up one level if part deletion occurs on part screen
    const navigate = useNavigate()
    const location = useLocation();

    function checkAndNavUp() {
        const parts = location.pathname.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart === locationData._id) {
            const newUrl = parts.slice(0, -1).join('/');
            navigate(newUrl)
        }
    }

    function handleLocationDeletion() {
        deleteLocation(locationData._id)
        dispatch(setLocationDeleteModalOpen({ locationDeleteModalOpen: false }))
        checkAndNavUp()
    }

    return (
        <Modal open={locationDeleteModalOpen} onClose={() => {
            dispatch(setLocationDeleteModalOpen({ locationDeleteModalOpen: false }))
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", p: 2 }}>
                <CardHeader title='Are you sure you want to delete the part?' />
                <CardActionArea>
                    <Stack spacing={1}>
                        <Button
                            color='error'
                            onClick={handleLocationDeletion}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(setLocationDeleteModalOpen({ locationDeleteModalOpen: false }))
                            }}>
                            Cancel
                        </Button>
                    </Stack>
                </CardActionArea>
            </Card>
        </Modal>
    )
}