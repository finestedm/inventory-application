import express from 'express'
const router = express.Router();

// Require controller modules
import { location_list, location_details, create_new_location, edit_location } from '../controllers/locationsController.js'

// Main route

router.post('/edit_location', edit_location)
router.post('/new_location', create_new_location)
router.get('/:id', location_details)
router.get('/', location_list)

export default router
