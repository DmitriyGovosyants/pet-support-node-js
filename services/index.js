const {
  createUser,
  findUserById,
  findUserByEmail,
  updateToken,
  updateUser,
} = require('./userService');
const { login, logout } = require('./authService.js');

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateToken,
  updateUser,
  login,
  logout,
};
