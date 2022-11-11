const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for information'],
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  notices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
  favoriteNotices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
