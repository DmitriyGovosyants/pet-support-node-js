const noticeController = require('./noticeController');
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require('./authController');
const newsController = require('./newsController');
const servicesController = require('./servicesController')

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  servicesController,
  newsController,
  noticeController,
};

