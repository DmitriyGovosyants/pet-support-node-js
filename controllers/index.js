const noticeController = require('./noticeController');
const {
  registerController,
  loginController,
  logoutController,
} = require('./authController');
const {
  getPets,
  getPetsById,
  addPets,
  deletePet,
  getUser,
  updateUser,
  updatePet,
} = require('./userController');
const newsController = require('./newsController');
const servicesController = require('./servicesController');

module.exports = {
  registerController,
  loginController,
  logoutController,
  getPets,
  getPetsById,
  addPets,
  deletePet,
  getUser,
  updateUser,
  updatePet,
  servicesController,
  newsController,
  noticeController,
};
