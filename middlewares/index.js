const { authentificate } = require('./authentificate');
const { regLogValidation } = require('./userValidation');
const noticeValidation = require('./noticeValidation');
const fileLoader = require('./fileLoader');
const { petsValidation } = require('./petsValidation');

module.exports = {
  authentificate,
  regLogValidation,
  noticeValidation,
  fileLoader,
  petsValidation,
};
