const { Schema, model } = require("mongoose")

const newsShema = new Schema({
    title: {
        type: String,
        required: [true, 'Set denotation for news'],
    },
    url: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
    },
    date: {
        type: String,
    }
}, {
    versionKey: false
}
)

const News = model("news", newsShema)

module.exports = { News }