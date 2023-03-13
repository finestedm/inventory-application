import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    city: { type: String, required: true, minLength: 2, maxLength: 30 },
    country: { type: String, required: true, minLength: 2, maxLength: 30 },
})

//Virtual for part's URL
LocationSchema.virtual('url').get(function () {
    return `/catalog/location/${this._id}`
})

const Location = mongoose.model('Location', LocationSchema)

export default Location