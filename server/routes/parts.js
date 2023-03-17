import express from 'express'
const router = express.Router();

// Require controller modules
import { part_list, part_details } from '../controllers/partsController.js'

// Main route

router.get('/:id', part_details)
router.get('/', part_list)

export default router
