import axios from 'axios'
import util from 'util';

export async function map_embed(req, res) {

    try {

        const { street, city } = req.body;

        const address = `${street}, ${city}`;
        const query = encodeURIComponent(address);
        const apiKey = process.env.GOOGLE_API
        const url = `http://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`;

        axios.get(url)
            // .then(response => console.log(util.inspect(response.data)))
            .then((response) => res.status(200).send(response.data))
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}