const { User } = require('../models');
const jwt = require('jsonwebtoken'); // Библиотека для создания токенов
const { SECRET_KEY } = process.env; // секрет для подписи токена

// Создает нового юзера в базе
const createUser = async body => {
  const user = await new User(body);
  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '6h' })
  user.token = token
  return user.save();
};

// Находит юзера в базе по id
const findUserById = async id => {
  const user = await User.findById(id);
  return user;
};

// Находит юзера в базе по email
const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

// Обновляет токен юзера
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

// Обновляет данные юзера
const updateUser = async (id, body) => {
  const updatedUser = await User.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
  return updatedUser;
};

module.exports = {
  createUser,
  findUserByEmail,
  updateToken,
  updateUser,
  findUserById,
};
