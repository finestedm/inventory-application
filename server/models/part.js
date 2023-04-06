import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PartSchema = new Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    manufacturer: { type: String, required: true, minLength: 2, maxLength: 50 },
    price: { type: Number, required: true, min: 1, max: 999999 },
    createdAt: { type: Date, default: Date.now }
})

//Virtual for part's URL
PartSchema.virtual('url').get(function () {
    return `/catalog/part/${this._id}`
})

const Part = mongoose.model('Part', PartSchema)

export default Part