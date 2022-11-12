const User = require('../models/users');

// Создает нового юзера в базе
const createUser = async body => {
  const user = await new User(body);
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
  // console.log(user);
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
  findUserById,
  findUserByEmail,
  updateToken,
  updateUser,
};
