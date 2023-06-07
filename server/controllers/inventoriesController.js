// IMPORT MODELS
import Inventory from '../models/inventory.js';
import Location from '../models/location.js'

export async function inventory_list(req, res) {
    try {
        const inventory_list = await Inventory.find()
            .populate('part')
            .populate('location')
        res.status(200).json(inventory_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function part_availability_locations(req, res) {
    try {
        const locations = await Inventory
            .find({
                part: { _id: req.params.id },
                location: { $in: await Location.distinct('_id') }
            })
            .select('location available')
            .populate('location part')
        res.status(200).json(locations)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function edit_inventory(req, res) {
    const inventory = req.body;
    const query = { part: inventory.part._id, location: inventory.location._id };
    const update = { available: inventory.available };

    const options = { upsert: true, new: true };

    try {
        const result = await Inventory.findOneAndUpdate(query, update, options);

        res.status(200).send('Inventory updated successfully.');
    } catch (error) {
        console.error(`Error updating inventory: ${error}`);
        res.status(500).send('Error updating inventory');
    }
}