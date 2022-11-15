const JoiImport = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiImport.extend(JoiDate);
Joi.objectId = require('joi-objectid')(Joi);

// Схема валидации создания карточки Pet
const addPetSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я\s]*$/)
    .min(2)
    .max(16)
    .required()
    .messages({
      'string.min': 'Name should have a minimum length of {#limit}',
      'string.max': 'Name should have a maximum length of {#limit}',
      'string.pattern.base': 'Name should have only letters',
    }),
  birthdate: Joi.date()
    .format('DD.MM.YYYY')
    .raw()
    .max('now')
    .required()
    .messages({
      'date.format': ' Please, type in DD.MM.YYYY format',
    }),
  breed: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я\s]*$/)
    .min(2)
    .max(16)
    .required()
    .messages({
      'string.min': 'Breed should have a minimum length of {#limit}',
      'string.max': 'Breed should have a maximum length of {#limit}',
      'string.pattern.base': 'Breed should have only letters',
    }),
  avatarURL: Joi.string(),
  comments: Joi.string()
    .regex(/^[0-9a-zA-Zа-яА-Я!@#$%^&+=*,:;><'"~`?/.|\s]{8,120}$/)
    .required()
    .messages({
      'string.min': 'Comments should have a minimum length of {#limit}',
      'string.max': 'Comments should have a maximum length of {#limit}',
    }),
});

// Мидлвар обработки ошибок валидации body
const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);

  if (validationBody.error) {
    return res
      .status(400)
      .json({ message: validationBody.error.message.replace(/"/g, '') });
  }
  next();
};

module.exports = {
  petsValidation: (req, res, next) => {
    return validate(addPetSchema, res, req, next);
  },
};
