import { useFetch } from '../utils/hooks'

export default function Catalog() {

    const [data] = useFetch('http://localhost:5000/catalog')

    return (
        <div>
            <h1>List from server{"\n"}</h1>
            {data.map((item) => {
                return (
                    <div>
                        {item}
                    </div>)
            })}
        </div>
    )

}