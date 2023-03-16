// IMPORT MODELS
import Inventory from '../models/inventory.js';
import async from 'async'

export async function inventory_list(req, res) {
    try {
        const inventory_list = await Inventory.find()
            .populate('part')
            .populate('location')
        console.log(inventory_list)
        res.status(200).json(inventory_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

