import axios from "axios"
import { useEffect, useState } from "react"
import { ITag } from './Tags'
import { useParams } from "react-router-dom";
import { IPart } from "./Parts";
import CardList from "../components/CardList";

export default function Tag(): JSX.Element {

    const params = useParams();

    // set initial states of catalogCounts with declared types of data
    const [tag, setTag] = useState<ITag>()
    const [partsTagged, setPartsTagged] = useState<IPart[]>()

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get(`/catalog/tags/${params.name}`)
            .then((response) => {
                setTag(response.data.tag);
                setPartsTagged(response.data.partsTagged);
            })
    }, [])

    return (
        <div>
            {tag && <h2>{tag.name}</h2>}
            {partsTagged && <CardList parts={partsTagged}/>}
        </div>
    )

}