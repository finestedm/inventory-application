import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button, FormControlLabel } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag, IPart, ILocation, IError } from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setLocationData, setLocationEditModalOpen, setInventoryEditModalOpen, setInventoryData } from "../../features/modalSlide";

export default function InventoryEditModal() {

    const inventoryEditModalOpen = useSelector((state: RootState) => state.modal.inventoryEditModalOpen);
    const inventoryData = useSelector((state: RootState) => state.modal.inventoryData);
    const dispatch = useDispatch();

    const [data, setData] = useState(inventoryData);

    const [errors, setErrors] = useState<IError[]>([])

    // async function createNewLocation(locationData: ILocation) {
    //     try {
    //         const response = await axios.post('/locations/new_location', locationData);
    //         dispatch(setLocationEditModalOpen(false));
    //         return response.data;
    //     } catch (error: any) {
    //         console.log(error)
    //         setErrors(error.response.data.errors)
    //         // throw new Error();
    //     }
    // }

    // async function editLocation(locationData: ILocation) {
    //     try {
    //         const response = await axios.post(`/locations/edit_location`, locationData)
    //         dispatch(setLocationEditModalOpen(false));
    //         return response.data;
    //     } catch (error: any) {
    //         console.log(error)
    //         setErrors(error.response.data.errors)
    //     }
    // }

    return (
        <Modal open={inventoryEditModalOpen} onClose={() => {
            dispatch(setInventoryEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Edit stock in each location' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>

                        {inventoryData.map(inventory =>
                            <TextField
                                value={inventory.available}
                                type="number"
                                id={`${inventory.location?.city}-input`}
                                label={inventory.location?.city}
                                onChange={e => {
                                    const updatedInventoryData = inventoryData.map(inv => {
                                        if (inv.location?._id === inventory.location?._id) {
                                            return {
                                                ...inv,
                                                available: parseInt(e.target.value)
                                            }
                                        }
                                        return inv
                                    })
                                    dispatch(setInventoryData(updatedInventoryData))
                                }}
                            />
                        )}
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        {/* <Button onClick={() => setInventoryData(inventoryData)}>Edit part data</Button> */}
                        <Button onClick={() => { dispatch(setInventoryEditModalOpen(false)) }}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}
