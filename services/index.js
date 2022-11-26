const userService = require('../services/userService');
const authService = require('./authService.js');
const { addAvatar, setAvatarURL } = require('./uploadService');
const noticeService = require('./noticeService');
const petsService = require('./petsService');

module.exports = {
  userService,
  authService,
  addAvatar,
  setAvatarURL,
  noticeService,
  petsService,
};
