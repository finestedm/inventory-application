import express from 'express'
const router = express.Router();

// Require controller modules
import { edit_inventory, inventory_list, part_availability_locations } from '../controllers/inventoriesController.js'

// Main route

router.post('/edit_inventory', edit_inventory)
router.get('/:id', part_availability_locations)
router.get('/', inventory_list)

export default router
