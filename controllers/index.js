const noticeController = require('./noticeController');
const {
  registerController,
  loginController,
  logoutController,
  updateUserController,
} = require('./authController');
const { currentUserController } = require('./userController');
const newsController = require('./newsController');
const servicesController = require('./servicesController');

module.exports = {
  registerController,
  loginController,
  logoutController,
  updateUserController,
  currentUserController,
  servicesController,
  newsController,
  noticeController,
};
