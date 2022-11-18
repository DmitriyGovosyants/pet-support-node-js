// Контроллеры - прописываю логику обработки  маршрута
const { petsService, userService } = require('../services');

const { getAllPet, createPet, removePet, updatePetInfo } = petsService;
const { findUserById, updateUserInfo } = userService;

// Получение информации о юзере

// Текущий юзер
const getUser = async (req, res) => {
  const user = await findUserById(req.user.id);
  if (user) {
    res.json({
      code: 200,
      data: {
        user,
      },
      status: 'Success',
    });
  }
};

const updateUser = async (req, res) => {
  const user = req.user;
  const info = req.body;
  const avatarURL = req.avatarURL;
  const result = await updateUserInfo(user._id, info, avatarURL);
  res.status(201).json({
    code: 201,
    status: 'Success',
    data: {
      notice: result,
    },
  });
};

// Получение всех карточек Pet
const getPets = async (req, res) => {
  const result = await getAllPet(req.user.id, req.query);

  res.json({ code: 200, data: { pet: result }, status: 'Success' });
};

// Создание карточки Pet
const addPets = async (req, res) => {
  const user = req.user;
  const pet = req.body;
  const avatarURL = req.avatarURL;
  const result = await createPet(user._id, pet, avatarURL);
  res.status(201).json({
    code: 201,
    data: {
      pet: result,
    },
    status: 'Success',
  });
};

// Обновление карточки Pet

const updatePet = async (req, res) => {
  const { petID } = req.params;
  const info = req.body;
  const avatarURL = req.avatarURL;
  const result = await updatePetInfo(petID, info, avatarURL);
  res.status(201).json({
    code: 201,
    status: 'Success',
    data: {
      notice: result,
    },
  });
};

// Удаление карточки Pet
const deletePet = async (req, res, next) => {
  const result = await removePet(req.user.id, req.params.petID);

  if (!result) {
    next();
    return;
  }
  res.json({ code: 200, message: 'Pet is deleted', status: 'Success' });
};

module.exports = {
  updateUser,
  updatePet,
  getPets,
  addPets,
  deletePet,
  getUser,
};
