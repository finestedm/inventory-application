import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { ITag } from "./Tags";

export default function Parts(): JSX.Element {

    // declare types

    interface IPart {
        _id: string;
        name: string;
        manufacturer: string;
        price: number;
        tags: ITag[];
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
                {(parts).map(part =>
                    <li>
                        {part.name}
                        {part.manufacturer}
                        {part.price}
                        {<ul>{(part.tags).map(tag => <li>{tag.name}</li>)}</ul>}
                    </li>
                )}
            </ul>
        </div>
    )

}