// IMPORT MODELS
import Location from '../models/location.js'

export async function location_list(req, res) {
    try {
        const location_list = await Location.find();
        res.status(200).json(location_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function location_details(req, res) {
    try {
        const location = await Location.findOne({ _id: req.params.id });
        res.status(200).json(location)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

