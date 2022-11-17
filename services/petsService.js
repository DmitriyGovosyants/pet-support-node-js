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
  return await Pet.findById(petID);
};

// Создает  новую карточку Pet
const createPet = async (userID, pet, avatarURL) => {
  const newPet = await Pet.create({ ...pet, avatarURL: avatarURL });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { pets: newPet._id } }
  );
  if (newPet && updateUser) {
    return newPet;
  }
};

// Обновление карточку Pet
const updatePet = async (petID, info, avatarURL) => {
  const { name, birthdate, breed, comments } = info;
  const pet = await Pet.findByIdAndUpdate(
    { _id: petID },
    {
      name: name,
      birthdate: birthdate,
      breed: breed,
      comments: comments,
      avatarURL: avatarURL,
    },
    { new: true }
  );
  if (!pet) {
    return null;
  }
  return pet;
};

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

module.exports = {
  getAllPet,
  getPetById,
  createPet,
  updatePet,
  removePet,
};
