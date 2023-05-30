import { ConstructionOutlined } from "@mui/icons-material";
import { Grid, Modal, Box, Typography, Card, CardContent, CardHeader, TextField, FormControl, InputAdornment, Autocomplete, Stack, Paper, Button, Switch, FormControlLabel, FormHelperText } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPartEditModalOpen, RootState, setLocationData, setLocationEditModalOpen, setLocationOpenHoursEditModalOpen } from "../../features/modalSlide";
import { IError, ITag, IPart, ILocation, IOpeningHours } from "../interfaces";
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function LocationOpenHoursEditModal() {

    const locationOpenHoursEditModalOpen = useSelector((state: RootState) => state.modal.locationOpenHoursEditModalOpen);
    const locationData = useSelector((state: RootState) => state.modal.locationData);
    const [errors, setErrors] = useState<IError[]>([])
    const dispatch = useDispatch();

    async function editLocationOpeningHours(locationData: ILocation) {
        if (!validateOpeningHours(locationData)) {
            return;
        }
        try {
            const response = await axios.post(`/locations/edit_location_hours`, locationData)
            dispatch(setLocationOpenHoursEditModalOpen(false));
            return response.data;
        } catch (error: any) {
            console.log(error)
            setErrors(error.response?.data.errors)
        }
    }

    function validateOpeningHours() {
        const newErrors: IError[] = [];
        Object.entries(locationData.openingHours).forEach(([day, dayData]) => {
            if (dayData.open && dayData.close) {
                const openTime = dayjs(dayData.open);
                const closeTime = dayjs(dayData.close);
                if (closeTime.isBefore(openTime)) {
                    newErrors.push({
                        param: `openingHours.${day}.close`,
                        msg: 'Closing time must be later than opening time'
                    });
                }
            }
        });

        setErrors(newErrors);
        return newErrors.length === 0;
    }

    useEffect(() => {
        validateOpeningHours()
    }, [locationData.openingHours])

    // useEffect(() => {
    //     console.log(locationData.openingHours)
    //     setOpeningHoursLocal(locationData.openingHours)
    // }, [locationData])

    return (
        <Modal open={locationOpenHoursEditModalOpen} onClose={() => {
            dispatch(setLocationOpenHoursEditModalOpen(false))
            setErrors([])
        }}>
            <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)", px: 2 }}>
                <CardHeader title='Edit opening hours' sx={{ px: 0 }} />
                <CardContent component={Stack} spacing={3}>
                    <FormControl component={Stack} spacing={2}>
                        {(Object.entries(locationData.openingHours)).map(([day, openingHours]) =>
                            <DayOpenCloseTimePickers key={day} day={day} errors={errors} setErrors={setErrors} />
                        )}
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

function DayOpenCloseTimePickers({ day, errors, setErrors }: any) {

    const locationData = useSelector((state: RootState) => state.modal.locationData);
    const [isClosed, setIsClosed] = useState(!locationData.openingHours[day].open && !locationData.openingHours[day].closed)
    const dispatch = useDispatch();
    

    return (
        <Grid container alignItems='center'>
            <Grid item xs={2}>
                <Typography >{day}</Typography>
            </Grid>
            <Grid item xs={10}>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <FormControlLabel   // this switch controls hours. On switch close -> open we set 0:00 because on empty string this switch is automatically set to isClosed state. This resets previously set time! For now it's disabled and we will have to check on submit if this day isClosed -> then we will have to set hours to empty stings
                        control={<Switch
                            id={`${day}-switch`}
                            checked={!isClosed}
                            onChange={e => {
                                setIsClosed(!isClosed)
                                //on close set open and close hours for that day to null
                                const newOpeningHoursForDay = { ...locationData.openingHours[day], open: null, close: null }
                                const newOpeningHours = { ...locationData.openingHours, [day]: newOpeningHoursForDay }
                                dispatch(setLocationData({ ...locationData, openingHours: newOpeningHours }))
                            }}
                        />}
                        label={isClosed ? 'Closed' : 'Opened'}
                        labelPlacement="top"
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <FormControl>
                            <Stack direction='row' spacing={2} alignItems='start'>
                                <TimePicker
                                    value={dayjs(locationData.openingHours[day].open)}
                                    ampm={false}
                                    disabled={isClosed}
                                    label="Opening"
                                    onChange={(e) => {
                                        const newOpeningHoursForDay = { ...locationData.openingHours[day], open: e?.toString() }
                                        const newOpeningHours = { ...locationData.openingHours, [day]: newOpeningHoursForDay }
                                        dispatch(setLocationData({ ...locationData, openingHours: newOpeningHours }))
                                        // setErrors(errors.filter((error) => error.param !== `openingHours.${day}.open`));
                                    }}
                                />
                                <Typography variant="body1">-</Typography>
                                <TimePicker
                                    value={dayjs(locationData.openingHours[day].close)}
                                    ampm={false}
                                    disabled={isClosed}
                                    label="Closing"
                                    onChange={(e) => {
                                        const newOpeningHoursForDay = { ...locationData.openingHours[day], close: e?.toString() }
                                        const newOpeningHours = { ...locationData.openingHours, [day]: newOpeningHoursForDay }
                                        dispatch(setLocationData({ ...locationData, openingHours: newOpeningHours }))
                                        // setErrors(errors.filter((error) => error.param !== `openingHours.${day}.open`));
                                    }}
                                    slotProps={{
                                        // textField: {
                                        //   error: errors.filter(error => error.param === `openingHours.${day}.close`).length > 0,
                                        //   helperText: (errors
                                        //       .filter(error => error.param === `openingHours.${day}.close`)
                                        //       .map(error => error.msg)
                                        //       .join(', ')),
                                        // },
                                    }}
                                />
                            </Stack>
                        </FormControl>
                    </LocalizationProvider>
                </Stack>
            </Grid >

        </Grid >
    )
}


