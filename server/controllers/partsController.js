// IMPORT MODELS
import Part from '../models/part.js'
import async from 'async'

export async function part_list(req, res) {
    try {
        const part_list = await Part.find()
            .populate("tags");
        console.log(part_list)
        res.status(200).json(part_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

