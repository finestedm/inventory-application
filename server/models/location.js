import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    zip: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{5}$/.test(v);
            },
            message: props => `${props.value} is not a valid 5-digit number!`
        }
    },
    street: { type: String, required: true, minLength: 2, maxLength: 50 },
    city: { type: String, required: true, minLength: 2, maxLength: 30 },
    country: { type: String, required: true, minLength: 2, maxLength: 30 },
    openingHours: {
        type: {
            Monday: {
                open: String,
                close: String
            },
            Tuesday: {
                open: String,
                close: String
            },
            Wednesday: {
                open: String,
                close: String
            },
            Thursday: {
                open: String,
                close: String
            },
            Friday: {
                open: String,
                close: String
            },
            Saturday: {
                open: String,
                close: String
            },
            Sunday: {
                open: String,
                close: String
            }
        },
        default: {
            Monday: { open: null, close: null },
            Tuesday: { open: null, close: null },
            Wednesday: { open: null, close: null },
            Thursday: { open: null, close: null },
            Friday: { open: null, close: null },
            Saturday: { open: null, close: null },
            Sunday: { open: null, close: null }
        }
    },
    phoneNumber: { type: String, maxLength: 30 },
    email: {
        type: String,
        maxLength: 40,
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression for validating email format
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

//Virtual for part's URL
LocationSchema.virtual('url').get(function () {
    return `/catalog/location/${this._id}`
})

const Location = mongoose.model('Location', LocationSchema)

export default Location