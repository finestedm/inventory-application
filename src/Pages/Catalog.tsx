import axios from "axios"
import { useEffect, useState } from "react"
import CardList from "../components/CardList";
import { IPart } from "./Parts";

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
        axios.get('/catalog')
            .then((response) => setCatalogCount(response.data))
    }, [])

    // set initial states of catalogCounts with declared types of data
    const [parts, setParts] = useState<IPart[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/catalog/parts')
            .then((response) => setParts(response.data))
    }, [])


    return (
        <div>
            <CardList parts={parts} />
            {/* <CardList locations={locations} /> */}
            <ul>
                {Object.keys(catalogCounts).map(key => <li key={key}>{key}: {catalogCounts[key]}</li>)}
            </ul>
        </div>
    )

}