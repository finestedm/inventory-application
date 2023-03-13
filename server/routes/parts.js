import express from 'express'
const router = express.Router();

// Require controller modules
import { part_list } from '../controllers/partsController.js'

// Main route

router.get('/', part_list)

export default router
