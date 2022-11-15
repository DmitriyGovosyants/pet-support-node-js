const express = require('express');

const router = express.Router();

module.exports = router;

const { currentUserController } = require('../../controllers');

const { petsValidation, regLogValidation } = require('../../middlewares');
const { authentificate } = require('../../middlewares/authentificate');
const ctrlWrapper = require('../../helpers/ctrWrapper');

router.get('/info', authentificate, ctrlWrapper()); // Роут отримання особистої інфо користувача
router.get('/pets', authentificate, ctrlWrapper()); // Роут для отримання інфо о тваринах користувача
router.patch('/info', authentificate, ctrlWrapper()); // Роут для отримання одного із полів інфо користувача
router.post('/pets', authentificate, petsValidation, ctrlWrapper()); // Роут для додавання карточки тварини користувача авторизованим юзером
router.delete('/pets/:petID', authentificate, ctrlWrapper()); // Роут для видалення карточки тварини користувача
router.patch('/pets/:petID', authentificate, ctrlWrapper()); // Роут для редагування карточки тварин авторизованого користувача
router.get(
  '/current',
  authentificate,
  regLogValidation,
  ctrlWrapper(currentUserController)
); // Текущий юзер
