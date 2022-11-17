const { findUserByEmail } = require('../services/userService');
const { registration, login, logout, addToken } = require('./authService.js');
const { addAvatar, deleteFile } = require('./uploadService');
const noticeService = require('./noticeService');
const petsService = require('./petsService');

module.exports = {
  findUserByEmail,
  registration,
  login,
  logout,
  addToken,
  addAvatar,
  deleteFile,
  noticeService,
  petsService,
};
