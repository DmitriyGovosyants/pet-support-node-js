const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    birthdate: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    notices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
    favoriteNotices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
    pets: [{ type: Schema.Types.ObjectId, ref: 'pets' }],
  },
  { versionKey: false, timestamps: false }
);

// Хук, хеширует и солит пароль перед сохранением в базу
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
