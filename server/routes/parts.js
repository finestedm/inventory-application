import express from 'express'
const router = express.Router();

// Require controller modules
import { part_list, part_details, manufacturers, create_new_part, edit_part, delete_part } from '../controllers/partsController.js'

// Main route

router.delete('/delete_part/:id', delete_part)
router.post('/new_part', create_new_part)
router.post('/edit_part', edit_part)
router.get('/manufacturers', manufacturers)
router.get('/:id', part_details)
router.get('/', part_list)

export default router
