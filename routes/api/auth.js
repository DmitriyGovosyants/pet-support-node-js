const express = require('express');

const router = express.Router();

module.exports = router;

const { registerController } = require('../../controllers/authController');

const ctrlWrapper = require('../../helpers/ctrWrapper');

router.post('/signup', ctrlWrapper(registerController)); //   Регистрация
