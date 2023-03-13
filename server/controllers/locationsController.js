// IMPORT MODELS
import Location from '../models/location.js'
import async from 'async'

export async function location_list(req, res) {
    try {
        const location_list = await Location.find();
        console.log(location_list)
        res.status(200).json(location_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

