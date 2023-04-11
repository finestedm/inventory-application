import express from 'express'
const router = express.Router();

// Require controller modules
import { map_embed } from '../controllers/mapEmbedController.js';

// Main route
router.post('/', map_embed)

export default router