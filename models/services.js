
const { Schema, model } = require("mongoose")

const servicesShema = new Schema({
    title: {
        type: String,
        required: [true, 'Set denotation for services'],
    },
    url: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    },
    addressUrl: {
        type: String,
        default: null,
    },
    imageUrl: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    workDays:
        [
            {
                isOpen: Boolean,
                from: String,
                to: String,
            },
        ],
    phone: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    }
}, {
    versionKey: false
    // , timestamps: true
}
)

const Services = model("services", servicesShema)

module.exports = { Services }