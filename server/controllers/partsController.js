// IMPORT MODELS
import Part from '../models/part.js'

export async function part_list(req, res) {
    try {
        const part_list = await Part.find()
            .populate("tags");
        res.status(200).json(part_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function part_details(req, res) {
    try {
        console.log(req.params.id)
        const part = await Part.findOne({_id: req.params.id})
            .populate("tags");
        res.status(200).json(part)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

