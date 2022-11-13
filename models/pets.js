const mongoose = require('mongoose');

const { Schema } = mongoose;

const petsSchema = new Schema({
  name: String,
  birthdate: String,
  breed: String,
  avatarURL: String,
  place: String,
  sex: String,
  email: String,
  phone: String,
  sell: String,
  comments: { type: String, required: [true, 'Set comments for notice'] },
});

const Pets = mongoose.model('pets', petsSchema);

module.exports = Pets;

module.exports = Pets;
