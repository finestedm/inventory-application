import express from 'express'
const router = express.Router();

// Require controller modules
import { tag_list, tag_details } from '../controllers/tagsController.js'

// Main route

router.get('/:name', tag_details)
router.get('/', tag_list)

export default router
