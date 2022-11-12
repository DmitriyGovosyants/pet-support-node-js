const express = require('express');

const router = express.Router();

module.exports = router;

const {
  registerController,
  loginController,
  logoutController,
} = require('../../controllers/authController');

const ctrlWrapper = require('../../helpers/ctrWrapper');

router.post('/signup', ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController));
router.get('/logout', ctrlWrapper(logoutController));
