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
      required: [true, 'birthday is required'],
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

    notices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
    favoriteNotices: [{ type: Schema.Types.ObjectId, ref: 'notices' }],
  },
  { versionKey: false, timestamps: false }
);

// Хук, хеширует и солит пароль перед сохранением в базу
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  // this.password = hash;
  next();
  // if (this.isNew) {
  //   this.password = bcrypt.hashSync(this.password, 10);
  // }
});

// Сравнивает пароли при входе юзера (возвращает null если не совпадают)
userSchema.methods.validPassword = function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
