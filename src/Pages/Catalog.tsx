import axios from "axios"
import { ReactNode, useEffect, useState } from "react"

export default function Catalog(): JSX.Element {

    // declare types in catalogCounts
    interface ICatalogCounts {
        [key: string]: number;
    }

    // set initial states of catalogCounts with declared types of data
    const [catalogCounts, setCatalogCount] = useState<ICatalogCounts>({
        partCount: 0,
        somethingElse: 3
    })

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`${window.location.origin}${window.location.pathname}`)
            .then((response) => setCatalogCount(response.data))
    }, [])


    return (
        <div>
            <h2>Summary of the catalog</h2>
            <ul>
                {Object.keys(catalogCounts).map(key => <li>{key}: {catalogCounts[key]}</li>)}
            </ul>
        </div>
    )

}