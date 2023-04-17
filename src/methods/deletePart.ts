import axios from "axios";

export default function deletePart(partId: string) {
    axios.delete(`parts/delete_part/${partId}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}