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
        const part = await Part.findOne({ _id: req.params.id })
            .populate("tags");
        res.status(200).json(part)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function manufacturers(req, res) {
    try {
        const manufacturers = await Part.find({}, { _id: 0, manufacturer: 1 })
        const manufacturers2 = manufacturers.map((m, e) => manufacturers[e].manufacturer)
        // res sends json of arrays
        res.status(200).json(manufacturers2)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function create_new_part(req, res) {
    const { name, price, manufacturer, tags } = req.body;
    const newPart = new Part({
        name,
        price,
        manufacturer,
        tags
    });
    try {
        const createdPart = await newPart.save();
        res.status(201).json(createdPart);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
