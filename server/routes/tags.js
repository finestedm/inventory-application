import express from 'express'
const router = express.Router();

// Require controller modules
import { tag_list, tag_details, create_new_tag } from '../controllers/tagsController.js'

// Main route

router.post('/create_new_tag', create_new_tag)
router.get('/:name', tag_details)
router.get('/', tag_list)

export default router
