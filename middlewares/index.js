const { authentificate } = require('./authentificate');
const { regLogValidation } = require('./userValidation');
const noticeValidation = require('./noticeValidation');
const fileLoader = require('./fileLoader');

module.exports = {
  authentificate,
  regLogValidation,
  noticeValidation,
  fileLoader,
};
