const JoiImport = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiImport.extend(JoiDate);
Joi.objectId = require('joi-objectid')(Joi);

// Схема валидации создания карточки Pet
const addPetSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .min(2)
    .max(16)
    .messages({
      'string.min': 'Name should have a minimum length of {#limit}',
      'string.max': 'Name should have a maximum length of {#limit}',
      'string.pattern.base': 'Name should have only letters',
    }),
  birthdate: Joi.date().format('DD-MM-YYYY').raw().max('now').messages({
    'date.format': ' Please, type in DD-MM-YYYY format',
  }),
  breed: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .min(2)
    .max(16)
    .messages({
      'string.min': 'Breed should have a minimum length of {#limit}',
      'string.max': 'Breed should have a maximum length of {#limit}',
      'string.pattern.base': 'Breed should have only letters',
    }),
  sex: Joi.string().valid('male', 'female').messages({
    'any.only': 'You can choose only male or female',
  }),
  place: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .messages({
      'string.pattern.base': 'You should type in City',
    }),
  sell: Joi.string()
    .regex(/^[1-9][0-9]*$/)
    .messages({
      'string.pattern.base': "Sell couldn't start from 0",
    }),
  avatarURL: Joi.string(),
  comments: Joi.string().min(8).max(120).messages({
    'string.min': 'Comments should have a minimum length of {#limit}',
    'string.max': 'Comments should have a maximum length of {#limit}',
  }),
  phone: Joi.string().pattern(
    /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
  ),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] },
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
