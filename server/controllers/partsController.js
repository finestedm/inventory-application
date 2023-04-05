// IMPORT MODELS
import Part from '../models/part.js'
import { body, validationResult, check } from 'express-validator';
import validator from 'validator';

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

    // name sanitization
    const sanitizedName = validator.escape(name)

    // price validation
    await check('price')
        .toFloat()
        .isFloat({
            min: 0,
            max: 999999,
        })
        .withMessage('value cannot be smaller than 0 PLN and larger than 999999 PLN')
        .custom((value) => {
            const price = parseFloat(value);
            if (!Number.isNaN(price) && (price * 100) % 1 === 0) {
              return true;
            }
            throw new Error('Price must have at most two decimal places');
          })
          .validate(req)
    
    // manufacturer sanitization
    const sanitizedManufacturer = validator.escape(manufacturer)
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // creation of new part

    const newPart = new Part({
        name: sanitizedName,
        price: parseFloat(price),
        manufacturer: sanitizedManufacturer,
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

    // name sanitization
    const sanitizedName = validator.escape(name)

    // price validation
    await check('price')
        .toFloat()
        .isFloat({
            min: 0,
            max: 999999,
        })
        .withMessage('value cannot be smaller than 0 PLN and larger than 999999 PLN')
        .custom((value) => {
            const price = parseFloat(value);
            if (!Number.isNaN(price) && (price * 100) % 1 === 0) {
              return true;
            }
            throw new Error('Price must have at most two decimal places');
          })
          .validate(req)
    
    // manufacturer sanitization
    const sanitizedManufacturer = validator.escape(manufacturer)
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
        
    const newData = {
        name: sanitizedName,
        price: parseFloat(price),
        manufacturer: sanitizedManufacturer,
        tags
    };
    try {
        const updatedPart = await Part.findOneAndUpdate({ _id }, newData, { new: true })
        res.status(201).json(updatedPart);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
