import axios from "axios"
import { useEffect, useState } from "react"
import { IInventory } from "@/components/interfaces"

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
                        {inventory.part && inventory.part.name}
                        {inventory.location && inventory.location.city}
                        {inventory.available}
                    </li>
                )}
            </ul>
        </div>
    )

}