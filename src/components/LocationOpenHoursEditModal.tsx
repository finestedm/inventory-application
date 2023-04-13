import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";
import { IPart } from "../Pages/Parts";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setLocationData, setLocationEditModalOpen, setLocationOpenHoursEditModalOpen } from "../App";
import { IError } from "./interfaces";
import { ILocation } from "../Pages/Locations";
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function LocationOpenHoursEditModal() {

    const locationOpenHoursEditModalOpen = useSelector((state: RootState) => state.modal.locationOpenHoursEditModalOpen);
    const locationData = useSelector((state: RootState) => state.modal.locationData);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError[]>([])

    async function editLocation(locationData: ILocation) {
        try {
            const response = await axios.post(`/locations/edit_location_hours`, locationData)
            dispatch(setLocationOpenHoursEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            console.log(error)
            setErrors(error.response.data.errors)
        }
    }

    console.log(locationData.openingHours)
    return (
        <Modal open={locationOpenHoursEditModalOpen} onClose={() => {
            dispatch(setLocationOpenHoursEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Edit opening hours' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        {(locationData.openingHours).map(day => (
                            <Stack>

                                <Typography>{day.day}</Typography>
                                <Stack direction='row'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Opening"
                                            value={dayjs(day.open, 'H:mm')}
                                        />
                                        <TimePicker
                                            label="Closing"
                                            value={dayjs(day.close, 'H:mm')}
                                        />
                                    </LocalizationProvider>
                                    <TextField
                                        label='Opening'
                                        value={day.open}
                                        helperText={(errors.filter(error => error.param === `openingHours.${day.day}.open`)).map(msg => msg.msg).join(' • ')}
                                        onChange={(e) => {
                                            dispatch(setLocationData({
                                                ...locationData,
                                                openingHours: locationData.openingHours.map((dayData) => {
                                                    if (dayData.day === day.day) {
                                                        return { ...dayData, open: e.target.value };
                                                    }
                                                    return dayData;
                                                }),
                                            }))
                                            setErrors(errors.filter(error => error.param !== `openingHours.${day.day}.open`))
                                        }}
                                        error={(locationData.city.length < 2) || (locationData.city.length > 50) || (errors.filter(error => error.param === 'city').length > 0)}
                                    />
                                    <Typography>-</Typography>
                                    <TextField
                                        label='Closing'
                                        value={day.close}
                                        helperText={(errors.filter(error => error.param === `openingHours.${day.day}.close`)).map(msg => msg.msg).join(' • ')}
                                        onChange={(e) => {
                                            dispatch(setLocationData({
                                                ...locationData,
                                                openingHours: locationData.openingHours.map((dayData) => {
                                                    if (dayData.day === day.day) {
                                                        return { ...dayData, close: e.target.value };
                                                    }
                                                    return dayData;
                                                }),
                                            }))
                                            setErrors(errors.filter(error => error.param !== `openingHours.${day.day}.close`))
                                        }}
                                        error={(locationData.city.length < 2) || (locationData.city.length > 50) || (errors.filter(error => error.param === 'city').length > 0)}
                                    />
                                </Stack>
                            </Stack>
                        ))}

                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button onClick={() => editLocation(locationData)}>Edit part data</Button>
                        <Button onClick={() => { dispatch(setLocationOpenHoursEditModalOpen(false)) }}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}