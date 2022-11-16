const noticeController = require('./noticeController');
const {
  registerController,
  loginController,
  logoutController,
  updateUserController,
} = require('./authController');
const {
  getPets,
  getPetsById,
  addPets,
  deletePets,
  currentUserController,
} = require('./userController');
const newsController = require('./newsController');
const servicesController = require('./servicesController');

module.exports = {
  registerController,
  loginController,
  logoutController,
  updateUserController,
  getPets,
  getPetsById,
  addPets,
  deletePets,
  currentUserController,
  servicesController,
  newsController,
  noticeController,
};
