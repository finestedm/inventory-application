import axios from "axios"
import { ReactNode, useEffect, useState } from "react"

export default function Parts(): JSX.Element {

    // declare types in catalogCounts
    interface ILocation {
        _id: string;
        city: string;
        country: string;
    }

    // set initial states of catalogCounts with declared types of data
    const [locations, setLocations] = useState<ILocation[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/catalog/locations')
            .then((response) => setLocations(response.data))
    }, [])

    useEffect(() => {
        console.log(locations)
    }, [locations])

    return (
        <div>
            <h2>Summary of the catalog</h2>
            <ul>
                {(locations).map(part =>
                    <li>
                        {part.city}
                        {part.country}
                    </li>
                )}
            </ul>
        </div>
    )

}