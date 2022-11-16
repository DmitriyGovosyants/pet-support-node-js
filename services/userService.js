const { User } = require('../models');

// Находит юзера в базе по email
const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  findUserByEmail,
};
