const { authentificate } = require('./authentificate');
const { userValidation } = require('./userValidation');
const noticeValidation = require('./noticeValidation');
const fileLoader = require('./fileLoader');
const { petsValidation } = require('./petsValidation');

module.exports = {
  authentificate,
  userValidation,
  noticeValidation,
  fileLoader,
  petsValidation,
};
