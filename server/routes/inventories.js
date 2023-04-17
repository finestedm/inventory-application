import express from 'express'
const router = express.Router();

// Require controller modules
import { inventory_list, part_availability_locations } from '../controllers/inventoriesController.js'

// Main route

router.get('/:id', part_availability_locations)
router.get('/', inventory_list)

export default router
