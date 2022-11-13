const JoiImport = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiImport.extend(JoiDate);

const noticeValidation = (req, res, next) => {
  const schema = Joi.object({
    category: Joi.string()
      .valid('lost/found', 'in good hands', 'sell')
      .messages({
        'any.only': 'You can choose only from 3 categories',
      })
      .required(),
    title: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(2)
      .max(48)
      .required()
      .messages({
        'string.pattern.base': 'Title should have only letters',
      }),
    name: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(2)
      .max(16)
      .allow(null, '')
      .messages({
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'string.pattern.base': 'Name should have only letters',
      }),
    birthdate: Joi.date()
      .format('DD-MM-YYYY')
      .raw()
      .max('now')
      .allow(null, '')
      .messages({
        'date.format': ' Please, type in DD-MM-YYYY format',
      }),
    breed: Joi.string()
      .regex(/^[a-zA-Z\s]*$/)
      .min(2)
      .max(24)
      .allow(null, '')
      .messages({
        'string.min': 'Breed should have a minimum length of {#limit}',
        'string.max': 'Breed should have a maximum length of {#limit}',
        'string.pattern.base': 'Breed should have only letters',
      }),
    sex: Joi.string().valid('male', 'female').required().messages({
      'any.only': 'You can choose only male or female',
    }),
    location: Joi.string()
      .regex(/^[a-zA-Z]+, [a-zA-Z]+$/)
      .allow(null, '')
      .messages({
        'string.pattern.base': 'You should type in City, Region',
      }),
    price: Joi.string()
      .regex(/^[1-9][0-9]*$/)
      .required()
      .messages({
        'string.pattern.base': "Price couldn't start from 0",
      }),
    avatarURL: Joi.string(),
    comments: Joi.string().min(8).max(120).required().messages({
      'string.min': 'Comments should have a minimum length of {#limit}',
      'string.max': 'Comments should have a maximum length of {#limit}',
    }),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    console.log(validation.error);
    return res.status(400).json({ message: `${validation.error.message}` });
  }
  next();
};

module.exports = noticeValidation;
