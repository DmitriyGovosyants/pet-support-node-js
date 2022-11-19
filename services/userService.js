const isValid = require('mongoose').Types.ObjectId.isValid;
const { User } = require('../models');

// Находит юзера в базе по id
const findUserById = async petID => {
  if (!isValid(petID)) return false;

  const user = await User.findById(petID).select('-password, -token');
  return user;
};

// Находит юзера в базе по email
const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

// Обновление информации юзера
const updateUserInfo = async (userID, info) => {
  const { name, email, birthdate, phone, city } = info;
  return await User.findByIdAndUpdate(
    { _id: userID },
    {
      name: name,
      email: email,
      birthdate: birthdate,
      phone: phone,
      city: city,
    },
    { new: true }
  );
};

const addUserAvatar = async (avatarURL, user) => {
  const avatar = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      avatarURL: avatarURL,
    },
    { new: true }
  );
  if (!avatar) {
    return null;
  }
  return avatar;
};

module.exports = {
  findUserById,
  findUserByEmail,
  updateUserInfo,
  addUserAvatar,
};
