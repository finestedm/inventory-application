import axios from "axios"
import { useEffect, useState } from "react"

export default function Catalog() {



    const [catalogCounts, setCatalogCount] = useState({
        partCount: 0
    })

    useEffect(() => {
        axios.get(`${window.location.origin}${window.location.pathname}`)
            .then((response) => setCatalogCount(response.data))
    }, [])

    

    return (
        <div>
            <h2>Summary of the catalog</h2>
            <ul>
                {(Object.entries(catalogCounts)).map(object => <li>{catalogCounts[object]}</li>)}
            </ul>
        </div>
    )

}