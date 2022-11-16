// Контроллеры - прописываю логику обработки  маршрута
const {
  getAllPet,
  getPetById,
  createPet,
  removePet,
  findUserById,
} = require('../services/petsService');

// Получение информации о юзере

// Текущий юзер
const getUserInfo = async (req, res) => {
  const user = await findUserById(req.user.id);
  console.log(user);
  if (user) {
    res.status(200).json({
      data: {
        user,
      },
    });
  }
};

// Получение всех карточек Pet
const getPets = async (req, res) => {
  const pets = await getAllPet(req.user.id, req.query);

  res.status(200).json({ pets, status: 'Success' });
};

// Получение карточки Pet по id
const getPetsById = async (req, res) => {
  const pet = await getPetById(req.user.id, req.params.petID);

  if (!pet) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ pet, status: 'Success' });
};

// Создание карточки Pet
const addPets = async (req, res) => {
  const avatarURL = req.avatarURL;
  const pet = await createPet(req.user.id, req.body, avatarURL);

  if (!pet) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  res.status(201).json({ pet, status: 'Success' });
};

// Удаление карточки Pet
const deletePets = async (req, res) => {
  const result = await removePet(req.user.id, req.params.petID);

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ message: 'pet deleted' });
};

module.exports = {
  getPets,
  getPetsById,
  addPets,
  deletePets,
  getUserInfo,
};
