const mongoose = require('mongoose');

const { Schema } = mongoose;

const petsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Type name pet'],
  },
  date: {
    type: String,
    required: [true, 'Type date of birth'],
  },
  breed: {
    type: String,
    required: [true, 'Type breed'],
  },
  comments: {
    type: String,
    required: [true, 'Type comments'],
  },
});

const Pets = mongoose.model('pets', petsSchema);

module.exports = Pets;
