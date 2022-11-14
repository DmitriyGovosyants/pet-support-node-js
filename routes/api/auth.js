const express = require('express');

const router = express.Router();

module.exports = router;

const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateUserController,
} = require('../../controllers/authController');

const { regLogValidation } = require('../../middlewares/userValidation');
const { authentificate } = require('../../middlewares/authentificate');
const ctrlWrapper = require('../../helpers/ctrWrapper');

router.post('/signup', regLogValidation, ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController)); // Вход
router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход
router.get(
  '/current',
  authentificate,
  regLogValidation,
  ctrlWrapper(currentUserController)
); // Текущий юзер
router.patch('/:userId', authentificate, ctrlWrapper(updateUserController)); // Обновление данных юзера
