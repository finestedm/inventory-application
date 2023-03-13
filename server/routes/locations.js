import express from 'express'
const router = express.Router();

// Require controller modules
import { location_list } from '../controllers/locationsController.js'

// Main route

router.get('/', location_list)

export default router
