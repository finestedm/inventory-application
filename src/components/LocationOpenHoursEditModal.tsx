import { ConstructionOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button, Switch, FormControlLabel, FormHelperText } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITag } from "../Pages/Tags";
import { IPart } from "../Pages/Parts";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setLocationData, setLocationEditModalOpen, setLocationOpenHoursEditModalOpen } from "../App";
import { IError } from "./interfaces";
import { ILocation, OpeningHours } from "../Pages/Locations";
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isDisabled } from "@testing-library/user-event/dist/utils";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
dayjs.extend(customParseFormat);

export default function LocationOpenHoursEditModal() {

    const locationOpenHoursEditModalOpen = useSelector((state: RootState) => state.modal.locationOpenHoursEditModalOpen);
    const locationData = useSelector((state: RootState) => state.modal.locationData);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError[]>([])


    async function editLocationOpeningHours(locationData: ILocation) {
        try {
            const response = await axios.post(`/locations/edit_location_hours`, locationData)
            dispatch(setLocationOpenHoursEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            console.log(error)
            setErrors(error.response?.data.errors)
        }
    }

    function DayOpenCloseTimePickers({ day }: any) {

        const currentDay = (locationData.openingHours.find(dayData => dayData.day === day.day ))

        const [isClosed, setIsClosed] = useState(currentDay?.open === '' && currentDay.close === '');

        return (
            <Grid2 container spacing={1} flex={1} alignItems='center'>
                <Grid2 xs={2}>
                    <Typography >{day.day}</Typography>
                </Grid2>
                <Grid2 xs={10}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                    <FormControlLabel   // this switch controls hours. On switch close -> open we set 0:00 because on empty string this switch is automatically set to isClosed state. This resets previously set time! For now it's disabled and we will have to check on submit if this day isClosed -> then we will have to set hours to empty stings
                        control={<Switch
                            checked={!isClosed}
                            onChange={e => {
                                setIsClosed(!isClosed)
                                // dispatch(setLocationData({
                                //     ...locationData,
                                //     openingHours: locationData.openingHours.map((dayData) => { 
                                //         if (dayData.day === day.day) {
                                //             return isClosed ? { ...dayData, open: '0:00', close: '0:00' } : { ...dayData, open: '', close: '' };
                                //         }
                                //         return dayData;
                                //     }),
                                // }))
                            }}
                        />}
                        label={isClosed ? 'Closed' : 'Opened'}
                        labelPlacement="top"
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <FormControl>
                            <TimePicker
                                disabled={isClosed}
                                ampm={false}
                                label="Opening"
                                value={dayjs(day.open, 'H:mm')}
                                onChange={(e) => {
                                    const newTime = dayjs(e, 'H:mm');
                                    dispatch(setLocationData({
                                        ...locationData,
                                        openingHours: locationData.openingHours.map((dayData) => {
                                            if (dayData.day === day.day) {
                                                return { ...dayData, open: dayjs(newTime, 'H:mm').format('H:mm') };
                                            }
                                            return dayData;
                                        }),
                                    }))
                                    setErrors(errors.filter(error => error.param !== `openingHours.${day.day}.open`))
                                }}
                            />
                            <FormHelperText>{(errors.filter(error => error.param === `openingHours.${day.day}.open`)).map(msg => msg.msg).join(' • ')}</FormHelperText>
                        </FormControl>
                        
                        <Typography>-</Typography>

                        <FormControl>
                            <TimePicker
                                disabled={isClosed}
                                ampm={false}
                                label="Closing"
                                value={dayjs(day.close, 'H:mm')}
                                onChange={(e) => {
                                    const newTime = dayjs(e, 'H:mm');
                                    dispatch(setLocationData({
                                        ...locationData,
                                        openingHours: locationData.openingHours.map((dayData) => {
                                            if (dayData.day === day.day) {
                                                return { ...dayData, close: dayjs(newTime).format('H:mm') };
                                            }
                                            return dayData;
                                        }),
                                    }))
                                    setErrors(errors.filter(error => error.param !== `openingHours.${day.day}.close`))
                                }}
                            />
                            <FormHelperText>{(errors.filter(error => error.param === `openingHours.${day.day}.close`)).map(msg => msg.msg).join(' • ')}</FormHelperText>
                        </FormControl>
                        </LocalizationProvider>
                        </Stack>
                </Grid2>

            </Grid2>
        )
    }


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
                            <DayOpenCloseTimePickers day={day} />))}
                    </FormControl>
                    <Stack spacing={2} direction='row' justifyContent="space-between">
                        <Button onClick={() => editLocationOpeningHours(locationData)}>Edit part data</Button>
                        <Button onClick={() => { dispatch(setLocationOpenHoursEditModalOpen(false)) }}>Cancel</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    )
}

