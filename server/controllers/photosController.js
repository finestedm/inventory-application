import Photo from "../models/photo.js";
import multer from 'multer'
import path from 'path'
import fs from 'fs'

export function uploadPhoto(req) {
    return new Promise((resolve, reject) => {
        fs.readFile(req.file.path, async function (err, data) {
            if (err) {
                reject(new Error("Cannot read file"));
            } else {
                try {
                    const newPhoto = new Photo({
                        filename: req.file.filename,
                        path: req.file.path,
                        size: req.file.size,
                        contentType: req.file.mimetype,
                        data: data,
                    });
                    const savedPhoto = await newPhoto.save();
                    resolve(savedPhoto._id);
                } catch (error) {
                    console.error(error);
                    reject(new Error("Server error"));
                }
            }
        });
    });
}