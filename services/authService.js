const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isValid = require('mongoose').Types.ObjectId.isValid;

const { User } = require('../models');

const { SECRET_KEY } = process.env; // секрет для подписи токена

// Регистрация юзера
const registration = async body => {
  const user = await User.create({ ...body });
  const payload = {
    id: user.id,
    email: user.email,
  };
  return await addToken(payload);
};

// Логин юзера
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return 'invalidEmail';
  }
  const isValidPassword = await bcrypt.compareSync(password, user.password);

  // Если юзер или пароль не валидные - вщзвращаем null вместо токена
  if (!isValidPassword) {
    return 'invalidPassword';
  }

  // Если валидные - создаем, подписываем и возвращаем токен с временем жизни
  const payload = {
    id: user.id,
    email: user.email,
  };
  return await addToken(payload);
};

// Выход юзера
const logout = async (id, token) => {
  return await User.findOneAndUpdate(
    { _id: id, token: token },
    { token: null }
  );
};

// Добавить токен
const addToken = async payload => {
  const { id } = payload;
  if (!isValid(id)) return false;
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  const updatedToken = await User.findByIdAndUpdate(
    { _id: id },
    { $set: { token: token } },
    { new: true }
  );
  return updatedToken.token;
};

module.exports = {
  registration,
  login,
  logout,
  addToken,
};
