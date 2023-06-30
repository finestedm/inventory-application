import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button, FormControlLabel } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag, IPart, ILocation, IError, IInventory } from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setLocationData, setLocationEditModalOpen, setInventoryEditModalOpen, setInventoryData } from "../../features/modalSlice";
import { v4 as uuid } from 'uuid';

export default function InventoryEditModal() {

    const inventoryEditModalOpen = useSelector((state: RootState) => state.modal.inventoryEditModalOpen);
    const inventoryData = useSelector((state: RootState) => state.modal.inventoryData);
    const partData = useSelector((state: RootState) => state.modal.partData)
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError[]>([])

    const [locations, setLocations] = useState<ILocation[]>([])

    useEffect(() => {
        axios.get('/locations')
            .then((response) => setLocations(response.data))
    }, [])

    async function editInventories() {
        try {
            for (let i = 0; i < inventoryData.length; i++) {
                const inventory = inventoryData[i];
                const modifiedInventory = {
                    ...inventory, part: { _id: inventory.part?._id }
                }
                const response = await axios.post("/availability/edit_inventory", modifiedInventory);
            }
            dispatch(setInventoryEditModalOpen(false));
        } catch (error: any) {
            console.log(error);
            setErrors(error.response?.data.errors);
        }
    }

    return (
        <Modal open={inventoryEditModalOpen} onClose={() => {
            dispatch(setInventoryEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Edit stock in each location' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        {inventoryData.map(inventory => {
                            return (
                                <TextField
                                    key={uuid()}
                                    value={inventory.available}
                                    type='number'
                                    id={`${inventory.location?.city}-input`}
                                    label={inventory.location?.city}
                                    onChange={e => {
                                        const updatedInventoryData = inventoryData.map(inv => {
                                            if (inv.location?._id === inventory.location?._id) {
                                                return {
                                                    ...inv,
                                                    available: parseInt(e.target.value),
                                                };
                                            }
                                            return inv;
                                        });
                                        if (!updatedInventoryData.some(inv => inv.location?._id === inventory.location?._id)) {
                                            updatedInventoryData.push({
                                                location: inventory.location,
                                                available: parseInt(e.target.value),
                                                part: partData
                                            });
                                        }
                                        dispatch(setInventoryData(updatedInventoryData));
                                    }}
                                />
                            );
                        })
                        }
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button onClick={() => editInventories()}>Edit part data</Button>
                        <Button onClick={() => { dispatch(setInventoryEditModalOpen(false)) }}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}
