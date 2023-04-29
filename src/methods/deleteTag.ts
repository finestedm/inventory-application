import axios from "axios";

export default function deleteTag(tagId: string) {
    axios.delete(`tags/delete_tag/${tagId}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}