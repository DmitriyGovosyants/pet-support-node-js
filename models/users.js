const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    required: [true, 'Set your name'],
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },

  notices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
  favoriteNotices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
