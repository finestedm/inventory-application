import axios from "axios";

export default function deleteLocation(locationId: string) {
    axios.delete(`locations/delete_location/${locationId}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}