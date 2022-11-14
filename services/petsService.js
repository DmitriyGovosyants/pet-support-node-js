// Сервис работы с БД
const Pets = require('../models/pets');

// Получаем все карточки Pet
const getAllPet = async () => {
  const pet = await Pets.find();
  return pet;
};

// Находит карточку Pet по id
const getPetById = async petID => {
  const pet = await Pets.findById(petID);
  return pet;
};

// Создает  новую карточку Pet
const createPet = async ({
  name,
  birthdate,
  breed,
  avatarURL,
  place,
  sex,
  email,
  phone,
  sell,
  comments,
}) => {
  const newPet = await Pets.create({
    name,
    birthdate,
    breed,
    avatarURL,
    place,
    sex,
    email,
    phone,
    sell,
    comments,
  });
  return newPet;
};

// Удаляет контакт
const removePet = async petID => {
  const pet = await Pets.findByIdAndRemove(petID);
  return pet;
};

module.exports = {
  getAllPet,
  getPetById,
  createPet,
  removePet,
};
