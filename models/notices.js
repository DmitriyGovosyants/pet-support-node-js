const { Schema, model } = require('mongoose');

const noticeSchema = new Schema({
  category: {
    type: String,
    required: [true, 'Set category for notice'],
  },
  title: {
    type: String,
    required: [true, 'Set title for notice'],
  },
  name: {
    type: String,
    default: null,
  },
  birthdate: {
    type: String,
    default: null,
  },
  breed: {
    type: String,
    default: null,
  },
  sex: {
    type: String,
    required: [true, 'Set sex for notice'],
  },
  location: {
    type: String,
    default: null,
  },
  price: {
    type: String,
    required: [true, 'Set price for notice'],
  },
  avatarURL: {
    type: String,
    default: null,
  },
  comments: {
    type: String,
    required: [true, 'Set comments for notice'],
  },
});

const Notice = model('notices', noticeSchema);

module.exports = Notice;
