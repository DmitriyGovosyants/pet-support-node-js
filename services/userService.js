const User = require('../models/user');

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

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
};
