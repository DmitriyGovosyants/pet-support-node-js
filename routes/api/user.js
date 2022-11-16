const express = require('express');

const router = express.Router();

module.exports = router;

const {
  getPets,
  getPetsById,
  addPets,
  deletePets,
  currentUserController,
} = require('../../controllers/userController');

const {
  petsValidation,
  authValidation,
  fileLoader,
} = require('../../middlewares');
const { authentificate } = require('../../middlewares/authentificate');
const { ctrlWrapper, upload } = require('../../helpers');

router.get('/info', authentificate, ctrlWrapper()); // Роут отримання особистої інфо користувача
router.get('/pets', authentificate, ctrlWrapper(getPets)); // Роут для отримання інфо о тваринах користувача
router.patch('/info', authentificate, ctrlWrapper()); // Роут для отримання одного із полів інфо користувача
router.post(
  '/pets',
  authentificate,
  upload.single('avatar'),
  petsValidation,
  fileLoader,
  ctrlWrapper(addPets)
); // Роут для додавання карточки тварини користувача авторизованим юзером
router.delete('/pets/:petID', authentificate, ctrlWrapper(deletePets)); // Роут для видалення карточки тварини користувача
router.patch('/pets/:petID', authentificate, ctrlWrapper(getPetsById)); // Роут для редагування карточки тварин авторизованого користувача
router.get(
  '/current',
  authentificate,
  authValidation,
  ctrlWrapper(currentUserController)
); // Текущий юзер
