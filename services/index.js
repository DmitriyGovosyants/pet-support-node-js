const {
  createUser,
  findUserById,
  findUserByEmail,
  updateToken,
} = require('./userService');
const { login, logout } = require('./authService.js');

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateToken,
  login,
  logout,
};
