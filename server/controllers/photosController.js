import Photo from "../models/photo.js";
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "../uploads/"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 }
})

export async function uploadPhoto(req, res) {
    upload.single("photo")(req, res, async function (err) {
        if (err) {
            console.error(err)
            return res.status(400).json({ error: "Error uploading photo" })
        } try {
            const newPhoto = new Photo({
                filename: req.file.filename,
                path: req.file.path
            });
            const savedPhoto = await newPhoto.save()
            return res.json(savedPhoto)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Server error" })
        }
    })
}