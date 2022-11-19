const express = require('express');
const { authController } = require('../../controllers');
const { userValidation, authentificate } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

const { registerController, loginController, logoutController } =
  authController;

router.post('/signup', userValidation, ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController)); // Вход
router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход

module.exports = router;
