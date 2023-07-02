import { setTagDeleteModalOpen } from "@/features/modalSlice";
import { RootState } from "@/features/combineReducer";
import deleteTag from "@/methods/deleteTag";
import { Button, Card, CardActionArea, CardHeader, Modal, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function TagDeleteModal(): JSX.Element {
    // read states 
    const tagDeleteModalOpen = useSelector((state: RootState) => state.modal.tagDeleteModalOpen);
    const tagData = useSelector((state: RootState) => state.modal.tagData);
    const dispatch = useDispatch();

    // set up navigation to move up one level if part deletion occurs on part screen
    const navigate = useNavigate()
    const location = useLocation();

    function checkAndNavUp() {
        const parts = location.pathname.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart === tagData.name) {
            const newUrl = parts.slice(0, -1).join('/');
            navigate(newUrl)
        }
    }

    function handleTagDeletion() {
        deleteTag(tagData._id)
        dispatch(setTagDeleteModalOpen({ tagDeleteModalOpen: false }))
        checkAndNavUp()
    }

    return (
        <Modal open={tagDeleteModalOpen} onClose={() => {
            dispatch(setTagDeleteModalOpen({ tagDeleteModalOpen: false }))
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", p: 2 }}>
                <CardHeader title='Are you sure you want to delete this tag?' />
                <CardActionArea>
                    <Stack spacing={1}>
                        <Button
                            color='error'
                            onClick={handleTagDeletion}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(setTagDeleteModalOpen({ tagDeleteModalOpen: false }))
                            }}>
                            Cancel
                        </Button>
                    </Stack>
                </CardActionArea>
            </Card>
        </Modal>
    )

}