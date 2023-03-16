import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    part: { type: Schema.Types.ObjectId, ref: 'Part', required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    available: { type: Number, required: true, min: 0, max: 10000 }
})

//Virtual for inventory's URL
InventorySchema.virtual('url').get(function () {
    return `/catalog/availability/${this._id}`
})

const Inventory = mongoose.model('Inventory', InventorySchema)

export default Inventory