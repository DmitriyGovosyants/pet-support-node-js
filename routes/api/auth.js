const express = require('express');

const router = express.Router();

module.exports = router;

const {
  registerController,
  loginController,
  logoutController,
  updateUserController,
} = require('../../controllers');

const { authValidation, authentificate } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

router.post('/signup', authValidation, ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController)); // Вход
router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход
router.patch('/:userId', authentificate, ctrlWrapper(updateUserController)); // Обновление данных юзера
