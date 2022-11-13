// Мидлвар для валидации
const JoiImport = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiImport.extend(JoiDate);

// Схема валидации регистрации и логина юзера
const regLogUserSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .messages({
      'string.pattern.base': 'Name should have only letters',
    }),
  city: Joi.string()
    .regex(/^[a-zA-Z]+, [a-zA-Z]+$/)
    .messages({
      'string.pattern.base': 'You should type in City, Region',
    }),
  birthdate: Joi.date().format('DD.MM.YYYY').raw().max('now').messages({
    'date.format': ' Please, type in DD.MM.YYYY format',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] },
    })
    .required(),
  password: Joi.string()
    .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=.*[!@#$%^&*])(?=\S*?[0-9]))\S$/)
    .min(7)
    .max(32)
    .trim()
    .required(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
});
//  Пояснения пароля:
// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 символов.
// Мидлвар для обработки ошибок валидации body
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
  regLogValidation: (req, res, next) => {
    return validate(regLogUserSchema, res, req, next);
  },
};
