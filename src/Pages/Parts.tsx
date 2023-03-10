import axios from "axios"
import { ReactNode, useEffect, useState } from "react"

export default function Parts(): JSX.Element {

    // declare types in catalogCounts
    interface IPart {
        _id: string;
        name: string;
        manufacturer: string;
        price: number;
    }

    // set initial states of catalogCounts with declared types of data
    const [parts, setParts] = useState<IPart[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/catalog/parts')
            .then((response) => setParts(response.data))
    }, [])

    useEffect(() => {
        console.log(parts)
    }, [parts])

    return (
        <div>
            <h2>Summary of the catalog</h2>
            <ul>
                {(parts).map(part => <li>
                    {part.name}
                    {part.manufacturer}
                    {part.price}
                </li>)}
            </ul>
        </div>
    )

}