const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;
const { deleteFile } = require('./uploadService');

// Сервис работы с БД
const { Pet, User } = require('../models');

// Получаем все карточки Pet
const getAllPet = async userID => {
  const user = await User.findOne({ _id: userID }).populate('pets');
  return user.pets;
};

// Находит карточку Pet по id
const getPetById = async petID => {
  if (!isValid(petID)) return false;
  const pet = await Pet.findById(petID);
  return pet;
};

// Создает  новую карточку Pet
const createPet = async (userID, pet, avatarURL) => {
  const newPet = await Pet.create({ ...pet, avatarURL: avatarURL });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { notices: newPet._id } }
  );
  if (newPet && updateUser) {
    return newPet;
  }
};

// Удаляет контакт
const removePet = async (userID, petsID) => {
  if (!isValid(petsID)) return false;
  const user = await User.findOne({ _id: userID });
  if (!user.pets.includes(ObjectId(petsID))) {
    return false;
  }
  const { avatarURL } = await Pet.findByIdAndRemove({ _id: petsID });
  const pathToImage = avatarURL.slice(22, avatarURL.length);
  await deleteFile(pathToImage);
  return await user.update({ $pull: { pets: petsID } });
};

// Находит юзера в базе по id
const findUserById = async petID => {
  if (!isValid(petID)) return false;

  const user = await User.findById(petID);
  return user;
};

module.exports = {
  getAllPet,
  getPetById,
  createPet,
  removePet,
  findUserById,
};
