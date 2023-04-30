import express from 'express'
const router = express.Router();

// Require controller modules
import { tag_list, tag_details, create_new_tag, delete_tag } from '../controllers/tagsController.js'

// Main route
router.delete('/delete_tag/:id', delete_tag)
router.post('/create_new_tag', create_new_tag)
router.get('/:name', tag_details)
router.get('/', tag_list)

export default router
