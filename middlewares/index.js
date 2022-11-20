const { authentificate } = require('./authentificate');
const { userValidation,updateUsersValidation } = require('./userValidation');
const noticeValidation = require('./noticeValidation');
const fileLoader = require('./fileLoader');
const { petsValidation } = require('./petsValidation');

module.exports = {
  authentificate,
  userValidation,
  updateUsersValidation,
  noticeValidation,
  fileLoader,
  petsValidation,
};
