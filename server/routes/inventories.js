import express from 'express'
const router = express.Router();

// Require controller modules
import { inventory_list } from '../controllers/inventoriesController.js'

// Main route

router.get('/', inventory_list)

export default router
