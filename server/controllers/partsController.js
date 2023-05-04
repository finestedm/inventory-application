// IMPORT MODELS
import Part from '../models/part.js'
import { body, validationResult, check } from 'express-validator';
import validator from 'validator';
import multer from 'multer'
import { uploadPhoto } from './photosController.js';
import Photo from '../models/photo.js';


export async function part_list(req, res) {

    // number of returned elements can now be controlled via limit query param
    const limit = req.query.limit

    try {
        const part_list = await Part
            .find()
            .sort({ created_at: -1 })
            .limit(limit ? parseInt(limit) : undefined)
            .populate("tags")
            .populate("photo");
        res.status(200).json(part_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function part_details(req, res) {
    try {
        const part = await Part.findOne({ _id: req.params.id })
            .populate("tags")
            .populate("photo");
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

    await check('name')
        .notEmpty()
        .withMessage('Name is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum name length is 2 letters');
            } else if (value.length > 50) {
                throw new Error('Maximum letters in name is 50');
            } else {
                return true;
            }
        })
        .run(req)

    // name sanitization
    const sanitizedName = validator.trim(validator.escape(name))

    // price validation
    await check('price')
        .toFloat()
        .isFloat({
            min: 0,
            max: 999999,
        })
        .withMessage('value cannot be smaller than 0 PLN and larger than 999999 PLN')
        .run(req)

    // manufacturer sanitization

    await check('manufacturer')
        .notEmpty()
        .withMessage('Manufacturer name is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum manufacturer name length is 2 letters');
            } else if (value.length > 50) {
                throw new Error('Maximum letters in manufacturer name is 50');
            } else {
                return true;
            }
        })
        .run(req)

    const sanitizedManufacturer = validator.trim(validator.escape(manufacturer))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // creation of new part

    const newPart = new Part({
        name: sanitizedName,
        price: parseFloat(price).toFixed(2),
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
    await check('name')
        .notEmpty()
        .withMessage('Name is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum name length is 2 letters');
            } else if (value.length > 50) {
                throw new Error('Maximum letters in name is 50');
            } else {
                return true;
            }
        })
        .run(req)

    const sanitizedName = validator.trim(validator.escape(name))

    // price validation
    await check('price')
        .toFloat()
        .isFloat({
            min: 0,
            max: 999999,
        })
        .withMessage('value cannot be smaller than 0 PLN and larger than 999999 PLN')
        .run(req)

    // manufacturer sanitization
    await check('manufacturer')
        .notEmpty()
        .withMessage('Manufacturer name is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum manufacturer name length is 2 letters');
            } else if (value.length > 50) {
                throw new Error('Maximum letters in manufacturer name is 50');
            } else {
                return true;
            }
        })
        .run(req)

    const sanitizedManufacturer = validator.trim(validator.escape(manufacturer))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const newData = {
        name: sanitizedName,
        price: parseFloat(price).toFixed(2),
        manufacturer: sanitizedManufacturer,
        tags,
    };


    try {
        const updatedPart = await Part.findOneAndUpdate({ _id }, newData, { new: true })
        res.status(201).json(updatedPart);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function delete_part(req, res) {

    try {
        const deletedPart = await Part.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedPart)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function upload_part_photo(req, res) {
    const _id = req.body.partId
    try {
        const photoId = await uploadPhoto(req, res)
        const newData = {
            photo: photoId,
        };
        const updatedPart = await Part.findOneAndUpdate({ _id }, newData, { new: true })
        res.status(200).json(updatedPart)
    } catch (error) {
        console.log(error)
    }
}