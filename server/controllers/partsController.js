// IMPORT MODELS
import Part from '../models/part.js'
import { body, validationResult, check } from 'express-validator';

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
        res.status(200).json([...new Set(manufacturers2)])
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function create_new_part(req, res) {

    const { name, price, manufacturer, tags } = req.body;


    // name validation
    await check('name')
        .isLength({ min: 2 })
        .withMessage('name has to be at least 2 letters long')
        .isLength({ max: 50 })
        .withMessage('name has to be max 50 letters long')
        .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

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

export async function edit_part(req, res) {
    const { _id, name, price, manufacturer, tags } = req.body;
    const newData = {
        name,
        price,
        manufacturer,
        tags
    };
    try {
        console.log(req.body)
        const updatedPart = await Part.findOneAndUpdate({ _id }, newData, { new: true })
        res.status(201).json(updatedPart);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
