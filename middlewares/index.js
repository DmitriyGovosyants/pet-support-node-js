const { authentificate } = require('./authentificate');
const { authValidation } = require('./userValidation');
const noticeValidation = require('./noticeValidation');
const fileLoader = require('./fileLoader');
const { petsValidation } = require('./petsValidation');

module.exports = {
  authentificate,
  authValidation,
  noticeValidation,
  fileLoader,
  petsValidation,
};
