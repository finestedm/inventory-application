import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";
import { IPart } from "../Pages/Parts";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setLocationData, setLocationEditModalOpen } from "../App";
import { IError } from "./interfaces";
import { ILocation } from "../Pages/Locations";

export default function LocationEditModal() {

    const locationEditModalOpen = useSelector((state: RootState) => state.modal.locationEditModalOpen);
    const locationData = useSelector((state: RootState) => state.modal.locationData);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError[]>([])

    async function createNewLocation(locationData: ILocation) {
        try {
            const response = await axios.post('/locations/new_location', locationData);
            dispatch(setLocationEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors)
            // throw new Error();
        }
    }

    async function editLocation(locationData: ILocation) {
        try {
            const response = await axios.post(`/location/edit_location`, locationData)
            dispatch(setLocationEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <Modal open={locationEditModalOpen} onClose={() => {
            dispatch(setLocationEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Add location' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        <TextField
                            label='New location city'
                            value={locationData.city}
                            helperText={(errors.filter(error => error.param === 'city')).map(msg => msg.msg).join(' • ')}
                            onChange={(e) => {
                                dispatch(setLocationData({ ...locationData, city: e.target.value }))
                                setErrors(errors.filter(error => error.param !== 'name'))
                            }}
                            error={(locationData.city.length < 2) || (locationData.city.length > 50) || (errors.filter(error => error.param === 'city').length > 0)}
                        />
                        <TextField
                            label='Zip code'
                            value={locationData.zip}
                            helperText={(errors.filter(error => error.param === 'zip')).map(msg => msg.msg).join(' • ')}
                            error={!/^\d{5}$/.test(locationData.zip) || (errors.filter(error => error.param === 'zip').length > 0)}
                            onChange={(e) => {
                                dispatch(setLocationData({ ...locationData, zip: e.target.value }))
                                setErrors(errors.filter(error => error.param !== 'zip'))
                            }}
                            inputProps={{
                                maxLength: 5,
                                pattern: '\\d{5}',
                                title: 'Enter 5 digit zip code (e.g. 12-345)'
                            }}
                        />
                        <TextField
                            label='Street name and building number'
                            value={locationData.street}
                            helperText={(errors.filter(error => error.param === 'street')).map(msg => msg.msg).join(' • ')}
                            error={!/^[a-zA-Z\s]+\d+\/?\d*$/.test(locationData.street) || (errors.filter(error => error.param === 'street').length > 0)}
                            onChange={(e) => {
                                dispatch(setLocationData({ ...locationData, street: e.target.value }))
                                setErrors(errors.filter(error => error.param !== 'street'))
                            }}
                        />
                        <TextField
                            label='Country'
                            value={locationData.country}
                            helperText={(errors.filter(error => error.param === 'street')).map(msg => msg.msg).join(' • ')}
                            error={(locationData.country.length < 2) || (locationData.country.length > 50) || (errors.filter(error => error.param === 'country').length > 0)}
                            onChange={(e) => {
                                dispatch(setLocationData({ ...locationData, country: e.target.value }))
                                setErrors(errors.filter(error => error.param !== 'country'))
                            }}
                        />

                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        {(locationData._id) ?
                            // this button should fire edit method instead of creation of new part
                            <Button onClick={() => editLocation(locationData)}>Edit part data</Button>
                            :
                            <Button onClick={() => createNewLocation(locationData)}>Add new part</Button>
                        }
                        <Button onClick={() => { dispatch(setLocationEditModalOpen(false)) }
                        }>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}