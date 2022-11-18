// Мидлвар для валидации
const JoiImport = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiImport.extend(JoiDate);

// Схема валидации регистрации и логина юзера
const userSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я\s]*$/)
    .messages({
      'string.pattern.base': 'Name should have only letters',
    }),
  city: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я]+, [a-zA-Zа-яА-Я]+$/)
    .messages({
      'string.pattern.base': 'You should type in City, Region',
    }),
  birthdate: Joi.date()
    .format('DD.MM.YYYY')
    .raw()
    .max('now')
    .allow(null, '')
    .messages({
      'date.format': ' Please, type in DD.MM.YYYY format',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] },
    })
    .messages({
      'string.base':
        'email must contain a domain name .com, .net, .org, .ua, .ru, .gov, .ca',
    })
    .required(),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Zа-яА-Я!@#$%^&+=*,:;><'"~`?/.|\S+]{7,32}$/)
    .messages({
      'string.pattern.base': 'Password length should have at 7 to 32 symbol',
    }),
  phone: Joi.string()
    .pattern(/^(\+[0-9]{12})$/)
    .required()
    .messages({
      'string.pattern.base': 'Please, type + and 12 numbers',
    }),
  avatarURL: Joi.string(),
});
//  Пояснения пароля:
//* будь-які літери та символи окрім пробілів. мін 7 символів максимум 32
// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 символов.
//* Валідація номера телефона
//* ^(\+[0-9]{12})$ - пропускає у форматі знак + і 12 цифр
// Мидлвар для обработки ошибок валидации body
const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);

  if (validationBody.error) {
    return res.status(400).json({
      code: 400,
      message: validationBody.error.message.replace(/"/g, ''),
    });
  }
  next();
};

module.exports = {
  userValidation: (req, res, next) => {
    return validate(userSchema, res, req, next);
  },
};
