import axios from "axios"
import { useEffect, useState } from "react"
import { IPart } from "./Parts";
import { ILocation } from "./Locations";

export interface IInventory {
    _id: string;
    part: IPart;
    location: ILocation;
    available: number
}

export default function Inventories(): JSX.Element {


    // set initial states of catalogCounts with declared types of data
    const [inventories, setInventories] = useState<IInventory[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/availability')
            .then((response) => setInventories(response.data))
    }, [])

    return (
        <div>
            <h2>Summary of the catalog</h2>
            <ul>
                {(inventories).map(inventory =>
                    <li key={inventory._id}>
                        {inventory.part.name}
                        {inventory.location.city}
                        {inventory.available}
                    </li>
                )}
            </ul>
        </div>
    )

}