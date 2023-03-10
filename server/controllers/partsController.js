// IMPORT MODELS
import Part from '../models/part.js'
import async from 'async'

export async function index(req, res, next) {

    try {
        const [partCount] = await Promise.all([
            Part.countDocuments(),
        ]);

        res.json({ partCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }

}

export async function part_list(req, res) {
    try {
        const part_list = await Part.find();
        console.log(part_list)
        res.status(200).json(part_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

