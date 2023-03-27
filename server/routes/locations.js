import express from 'express'
const router = express.Router();

// Require controller modules
import { location_list, location_details } from '../controllers/locationsController.js'

// Main route

router.get('/:id', location_details)
router.get('/', location_list)

export default router
