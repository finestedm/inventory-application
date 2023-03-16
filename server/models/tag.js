import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: { type: String, required: true },
})

//Virtual for tag's URL
TagSchema.virtual('url').get(function () {
    return `/catalog/tag/${this.name}`
})

const Tag = mongoose.model('Tag', TagSchema)

export default Tag