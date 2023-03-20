import express from 'express'
const router = express.Router();

// Require controller modules
import { part_list, part_details, manufacturers } from '../controllers/partsController.js'

// Main route

router.get('/manufacturers', manufacturers)
router.get('/:id', part_details)
router.get('/', part_list)

export default router
