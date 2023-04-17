import express from 'express'
const router = express.Router();

// Require controller modules
import { location_list, location_details, create_new_location, edit_location, delete_location, edit_location_hours } from '../controllers/locationsController.js'

// Main route

router.delete('/delete_location/:id', delete_location)
router.post('/edit_location', edit_location)
router.post('/edit_location_hours', edit_location_hours)
router.post('/new_location', create_new_location)
router.get('/:id', location_details)
router.get('/', location_list)

export default router
