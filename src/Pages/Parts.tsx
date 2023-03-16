import axios from "axios"
import { useEffect, useState } from "react"
import { ITag } from "./Tags";

// declare types

export interface IPart {
    _id: string;
    name: string;
    manufacturer: string;
    price: number;
    tags: ITag[];
}

export default function Parts(): JSX.Element {

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
                {(parts).map(part =>
                    <li key={part._id}>
                        {part.name}
                        {part.manufacturer}
                        {part.price}
                        {<ul>{(part.tags).map(tag => <li key={tag._id}>{tag.name}</li>)}</ul>}
                    </li>
                )}
            </ul>
        </div>
    )

}