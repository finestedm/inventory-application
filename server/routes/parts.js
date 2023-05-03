import express from 'express'
const router = express.Router();
import multer from 'multer'
import path from 'path'

// Require controller modules
import { part_list, part_details, manufacturers, create_new_part, edit_part, delete_part, upload_part_photo } from '../controllers/partsController.js'

// Set up the multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
});

// Main route

router.delete('/delete_part/:id', delete_part)
router.post('/new_part', create_new_part)
router.post('/edit_part', edit_part)
router.post('/upload_part_photo', upload.single('partPhoto'), upload_part_photo)
router.get('/manufacturers', manufacturers)
router.get('/:id', part_details)
router.get('/', part_list)

export default router
