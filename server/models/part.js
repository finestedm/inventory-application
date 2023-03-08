import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PartSchema = new Schema({
    name: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true }
})

//Virtual for part's URL
PartSchema.virtual('url').get(function () {
    return `/catalog/part/${this._id}`
})

const Part = mongoose.model('Part', PartSchema)

export default Part