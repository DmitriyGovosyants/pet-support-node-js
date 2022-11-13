const { Schema, model } = require('mongoose');

const noticeSchema = new Schema({
  category: String,
  title: { type: String, required: [true, 'Set title for notice'] },
  name: String,
  birthdate: String,
  breed: String,
  sex: String,
  location: String,
  price: { type: String, required: [true, 'Set price for notice'] },
  avatarURL: String,
  comments: { type: String, required: [true, 'Set comments for notice'] },
});

const Notice = model('notices', noticeSchema);

module.exports = Notice;
