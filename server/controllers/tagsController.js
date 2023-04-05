// IMPORT MODELS
import Tag from '../models/tag.js'
import Part from '../models/part.js';
import { body, validationResult, check } from 'express-validator';
import validator from 'validator';

export async function tag_list(req, res) {
    try {
        const tag_list = await Tag.find();
        console.log(tag_list)
        res.status(200).json(tag_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function tag_details(req, res) {
    try {
        const tag = await Tag.findOne({ name: req.params.name });
        const partsTagged = await Part.find({ tags: tag._id })
        res.status(200).json({tag, partsTagged})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function create_new_tag(req, res) {
    const { name } = req.body;
    
    const sanitizedName = validator.escape(name)

    const newTag = new Tag({
        name: sanitizedName
    })
    try {
        const createdTag = await newTag.save()
        res.status(201).json(createdTag)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
