import express from 'express'
const router = express.Router();

// Require controller modules
import { part_list, part_details, manufacturers, create_new_part } from '../controllers/partsController.js'

// Main route

router.post('/new_part', create_new_part)
router.get('/manufacturers', manufacturers)
router.get('/:id', part_details)
router.get('/', part_list)

export default router
