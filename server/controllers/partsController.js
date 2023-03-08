// IMPORT MODELS
import Part from '../models/part.js'
import async from 'async'

export async function index(req, res, next) {

    async.parallel(
        {
            parts_count(cb) {
                Part.countDocuments({}, cb) //passing empty object find all elements
            },
            // add all other components like categories and availability
        },
        (err, result) => {
            res.status(200).json(result)
        },
        next()
    )
}

export async function part_list(req, res) {
    try {
        const part_list = await Part.find();

        res.status(200).json(part_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

