const mongoose = require('mongoose');

const { Schema } = mongoose;

const petsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name of your pet'],
  },
  date: {
    type: Number,
  },
  breed: {
    type: String,
  },
  comments: {
    type: String,
  },
});

const Pets = mongoose.model('pets', petsSchema);

module.exports = Pets;
