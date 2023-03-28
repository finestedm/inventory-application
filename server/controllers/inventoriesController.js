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

export async function part_availability_locations(req, res) {
    try {
        const locations = await Inventory
            .find({ part: { _id: req.params.id }, available: { $gt: 0 } })
            .select('location available')
            .populate('location')
        console.log(locations)
        res.status(200).json(locations)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

