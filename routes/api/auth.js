const express = require('express');

const router = express.Router();

module.exports = router;

const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require('../../controllers/authController');

const { authentificate } = require('../../middlewares/authentificate');
const ctrlWrapper = require('../../helpers/ctrWrapper');

router.post('/signup', ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController)); // Вход
router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход
router.get('/current', ctrlWrapper(currentUserController)); // Текущий юзер
