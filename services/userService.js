const isValid = require('mongoose').Types.ObjectId.isValid;
const { User } = require('../models');

// Находит юзера в базе по id
const findUserById = async petID => {
  if (!isValid(petID)) return false;

  const user = await User.findById(petID);
  return user;
};

// Находит юзера в базе по email
const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

// Обновление информации юзера
const updateUser = async (userID, info, avatarURL) => {
  const { name, email, birthdate, phone, city } = info;
  const user = await User.findByIdAndUpdate(
    { _id: userID },
    {
      name: name,
      email: email,
      birthdate: birthdate,
      phone: phone,
      city: city,
      avatarURL: avatarURL,
    },
    { new: true }
  );
  if (!user) {
    return null;
  }
  return user;
};

module.exports = {
  findUserById,
  findUserByEmail,
  updateUser,
};
