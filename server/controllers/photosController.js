import Photo from "../models/photo.js";
import multer from 'multer'
import path from 'path'

export async function uploadPhoto(req, res) {
    console.log(req.file)
    // try {
    //     const newPhoto = new Photo({
    //         filename: req.file.filename,
    //         path: req.file.path,
    //         size: req.file.size,
    //         contentType: req.file.mimetype,
    //         data: req.file.buffer,
    //     });
    //     const savedPhoto = await newPhoto.save()
    //     return res.json(savedPhoto)
    // } catch (error) {
    //     console.error(error)
    //     return res.status(500).json({ error: "Server error" })
    // }
}