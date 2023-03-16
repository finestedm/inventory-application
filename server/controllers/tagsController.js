// IMPORT MODELS
import Tag from '../models/tag.js'

export async function tag_list(req, res) {
    try {
        const tag_list = await Tag.find();
        console.log(tag_list)
        res.status(200).json(tag_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

