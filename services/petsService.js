const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;
const { deleteImage } = require('./google-cloud');

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
const createPet = async (userID, pet) => {
  const newPet = await Pet.create({ ...pet });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { pets: newPet._id } }
  );
  if (newPet && updateUser) {
    return newPet;
  }
};

// Обновление карточку Pet
const updatePetInfo = async (petID, info) => {
  const { name, birthdate, breed, comments } = info;
  const pet = await Pet.findByIdAndUpdate(
    { _id: petID },
    {
      name: name,
      birthdate: birthdate,
      breed: breed,
      comments: comments,
    },
    { new: true }
  );
  if (!pet) {
    return null;
  }
  return pet;
};

const addPetAvatar = async (avatarURL, pet) => {
  const avatar = await Pet.findByIdAndUpdate(
    { _id: pet._id },
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

const removePet = async (userID, petsID) => {
  if (!isValid(petsID)) return false;
  const user = await User.findOne({ _id: userID });
  if (!user.pets.includes(ObjectId(petsID))) {
    return false;
  }
  const { avatarURL } = await Pet.findByIdAndRemove({ _id: petsID });
  const destination = 'users/pets';
  if (avatarURL) {
    await deleteImage(avatarURL, destination);
  }
  return await user.update({ $pull: { pets: petsID } });
};

module.exports = {
  getAllPet,
  getPetById,
  createPet,
  updatePetInfo,
  addPetAvatar,
  removePet,
};
