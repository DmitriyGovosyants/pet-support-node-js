const noticeController = require('./noticeController');
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require('./authController');
const getNews = require('./getNews');
const servicesController = require('./servicesController')

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  servicesController,
  getNews,
  noticeController,
};

