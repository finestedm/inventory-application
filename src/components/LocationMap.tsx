import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface ILocationMapProps {
    city: string;
    street: string
}


export default function LocationMap({ city, street }: ILocationMapProps) {

    const [googleMapData, setGoogleMapData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.post(`/map_embed`, { city, street })
            .then((response) => {
                setGoogleMapData(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error))
        setIsLoading(false)
    }, [])

    useEffect(() => {
        console.log(googleMapData)

    }, [googleMapData])

    return (
        isLoading ?
            <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', aspectRatio: '1/1', maxHeight: '70vh', borderRadius: '.25rem' }} />

            :
            <iframe
                width='100%'
                height='100%'
                srcDoc={googleMapData ? googleMapData : ''}
                allowFullScreen
            />

    )

}