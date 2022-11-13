const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require('./authController');
const getNews = require("./getNews")

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  getNews,
};
