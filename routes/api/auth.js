const express = require('express');

const router = express.Router();

module.exports = router;

const {
  registerController,
  loginController,
  logoutController,
} = require('../../controllers');

const { userValidation, authentificate } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

router.post('/signup', userValidation, ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController)); // Вход
router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход
