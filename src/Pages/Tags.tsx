import axios from "axios"
import { useEffect, useState } from "react"

export interface ITag {
    _id: string;
    name: string;
}

export default function Tags(): JSX.Element {


    // set initial states of catalogCounts with declared types of data
    const [tags, setTags] = useState<ITag[]>([])

    // get data from server: number of elements in each category
    useEffect(() => {
        axios.get('/catalog/tags')
            .then((response) => setTags(response.data))
    }, [])

    useEffect(() => {
        console.log(tags)
    }, [tags])

    return (
        <div>
            <h2>Summary of the catalog</h2>
            <ul>
                {(tags).map(tag =>
                    <li key={tag._id}>
                        {tag.name}
                    </li>
                )}
            </ul>
        </div>
    )

}