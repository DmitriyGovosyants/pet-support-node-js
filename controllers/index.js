const noticeController = require('./noticeController');
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require('./authController');
const getNews = require('./getNews');

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  getServices,
  getNews,
  noticeController,
};

