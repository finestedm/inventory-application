import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => {
                return v <= 3000000
            },
            message: props => `${props.value} exceeds the limit of 3MB`
        }
    },
}, { timestamps: true })

//Virtual for photo's URL
PhotoSchema.virtual('url').get(function () {
    return `/catalog/photo/${this._id}`
})

const Photo = mongoose.model('Photo', PhotoSchema)

export default Photo