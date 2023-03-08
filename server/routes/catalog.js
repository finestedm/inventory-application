import express from 'express'
const router = express.Router();

// Require controller modules
import { index, part_list } from '../controllers/partsController.js'

// Main route

router.get('/', index)
router.get('/parts', part_list)

export default router
