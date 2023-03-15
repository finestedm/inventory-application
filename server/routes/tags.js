import express from 'express'
const router = express.Router();

// Require controller modules
import { tag_list } from '../controllers/tagsController.js'

// Main route

router.get('/', tag_list)

export default router
