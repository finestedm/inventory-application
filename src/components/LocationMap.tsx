import { Skeleton } from "@mui/material";
import React, { Component, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';
import axios from "axios";



interface ILocationMapProps {
    city: string;
    street: string
    options?: object
}


export default function LocationMap({ city, street, options }: ILocationMapProps) {


    // api keys and address setup
    const googleMapsApiKey = "AIzaSyDlJh02GjhxXq70SMNFAU81lNiVVXFyvf0"
    const address = `${city},${street}`

    //getting geo data from address using google api
    interface IGeoData {
        lat: number,
        lng: number
    }
    const [geoData, setGeoData] = useState<IGeoData>()
    const [notFound, setNotFound] = useState(false);

    // loading Google Maps API and setting geoData
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
    });

    // setting geoData
    useEffect(() => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`)
            .then((res) => {
                if (res.data.status === "OK") {
                    setGeoData(res.data.results[0]?.geometry.location);
                } else {
                    setNotFound(true);
                }
            })
    }, [])

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded || notFound) return <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh', borderRadius: '.25rem' }} />;

    return (

        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={15}
            center={geoData}
            options={options}
        >
        </GoogleMap>
    )

}