const express = require('express');
const { userController } = require('../../controllers');
const {
  authentificate,
  petsValidation,
  userValidation,
  fileLoader,
} = require('../../middlewares');
const { ctrlWrapper, upload } = require('../../helpers');

const router = express.Router();

const {
  getUser,
  getPets,
  addPet,
  deletePet,
  updateUser,
  addAvatar,
  updatePet,
  updatePetAvatar,
} = userController;

router.get('/info', authentificate, ctrlWrapper(getUser)); // Роут отримання особистої інфо користувача
router.get('/pets', authentificate, ctrlWrapper(getPets)); // Роут для отримання інфо о тваринах користувача
router.put(
  '/info',
  authentificate,
  upload.single('avatar'),
  userValidation,
  ctrlWrapper(updateUser),
  ctrlWrapper(fileLoader),
  ctrlWrapper(addAvatar)
); // Роут для отримання одного із полів інфо користувача
router.post(
  '/pets',
  authentificate,
  upload.single('avatar'),
  petsValidation,
  ctrlWrapper(addPet),
  ctrlWrapper(fileLoader),
  ctrlWrapper(updatePetAvatar)
); // Роут для додавання карточки тварини користувача авторизованим юзером
router.delete('/pets/:petID', authentificate, ctrlWrapper(deletePet)); // Роут для видалення карточки тварини користувача
router.put(
  '/pets/:petID',
  authentificate,
  upload.single('avatar'),
  petsValidation,
  ctrlWrapper(updatePet),
  ctrlWrapper(fileLoader),
  ctrlWrapper(updatePetAvatar)
); // Роут для редагування карточки тварин авторизованого користувача

module.exports = router;
