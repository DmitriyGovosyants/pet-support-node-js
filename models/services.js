
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
    addressUrl: {},
    imageUrl: {},
    address: {
        type: String,
        required: 'Description can\'t be empty',
    },
    workDays: {
        type: String,
    },
    phone: {},
    email: {}
}, {
    versionKey: false
    // , timestamps: true
}
)

const Services = model("services", servicesShema)

module.exports = { Services }