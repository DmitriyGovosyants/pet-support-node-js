const express = require('express');

const router = express.Router();

module.exports = router;

const {
  getUser,
  getPets,
  addPets,
  deletePet,
  updateUser,
  updatePet,
} = require('../../controllers');

const {
  authentificate,
  petsValidation,
  userValidation,
  fileLoader,
} = require('../../middlewares');
const { ctrlWrapper, upload } = require('../../helpers');

router.get('/info', authentificate, ctrlWrapper(getUser)); // Роут отримання особистої інфо користувача
router.get('/pets', authentificate, ctrlWrapper(getPets)); // Роут для отримання інфо о тваринах користувача
router.put(
  '/info',
  authentificate,
  upload.single('avatar'),
  userValidation,
  fileLoader,
  ctrlWrapper(updateUser)
); // Роут для отримання одного із полів інфо користувача
router.post(
  '/pets',
  authentificate,
  upload.single('avatar'),
  petsValidation,
  fileLoader,
  ctrlWrapper(addPets)
); // Роут для додавання карточки тварини користувача авторизованим юзером
router.delete('/pets/:petID', authentificate, ctrlWrapper(deletePet)); // Роут для видалення карточки тварини користувача
router.put(
  '/pets/:petID',
  authentificate,
  upload.single('avatar'),
  petsValidation,
  fileLoader,
  ctrlWrapper(updatePet)
); // Роут для редагування карточки тварин авторизованого користувача
