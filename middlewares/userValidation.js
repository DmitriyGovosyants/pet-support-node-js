// Мидлвар для валидации
const JoiImport = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiImport.extend(JoiDate);

// Схема валидации регистрации и логина юзера
const userSchema = Joi.object({
  name: Joi.string()
    .regex(/^[^ 0-9][a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]*$/)
    .required()
    .messages({
      'string.pattern.base':
        'Name should have only letters and don`t start with a space',
      'string.empty': 'Name can`t be empty',
    }),
  city: Joi.string()
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]+, [a-zA-Zа-яА-ЯёЁіІїЇєЄ]+$/)
    .required()
    .messages({
      'string.pattern.base': 'You should type location in format: City, Region',
    }),
  birthdate: Joi.date().format('DD.MM.YYYY').raw().max('now').messages({
    'date.format': ' Please, type in DD.MM.YYYY format',
  }),
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] },
    })
    .required()
    .messages({
      'string.email':
        'email must contain a domain name .com, .net, .org, .ua, .ru, .gov, .ca',
      'string.pattern.base': 'Email only on English and with @',
    })
    .required(),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Zа-яА-ЯёЁіІїЇєЄ!@#$%^&+=*,:;><'"~`?_\-()\/.|\S+]{7,32}$/)
    .messages({
      'string.pattern.base':
        'Password length should have at 7 to 32 symbol and does not contain a space',
    }),
  phone: Joi.string()
    .pattern(/^(\+[0-9]{12})$/)
    .required()
    .messages({
      'string.pattern.base': 'Please, type + and 12 numbers',
    }),
  avatarURL: Joi.string(),
});

//  Обновление юзера
const updateUsersSchema = Joi.object({
  name: Joi.string()
    .regex(/^[^ 0-9][a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]*$/)
    .optional()
    .messages({
      'string.pattern.base':
        'Name should have only letters and don`t start with a space',
      'string.empty': 'Name can`t be empty',
    }),
  city: Joi.string()
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]+, [a-zA-Zа-яА-ЯёЁіІїЇєЄ]+$/)
    .optional()
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
    .optional()
    .messages({
      'string.email':
        'email must contain a domain name .com, .net, .org, .ua, .ru, .gov, .ca',
    })
    .optional(),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Zа-яА-ЯёЁіІїЇєЄ_!@#$%^&+=*,:;><'"~`?\-\/.|\S+]{7,32}$/)
    .messages({
      'string.pattern.base':
        'Password length should have at 7 to 32 symbol and does not contain a space',
    }),
  phone: Joi.string()
    .pattern(/^(\+[0-9]{12})$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please, type + and 12 numbers',
    }),
  avatarURL: Joi.string(),
});

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
  updateUsersValidation: (req, res, next) => {
    return validate(updateUsersSchema, res, req, next);
  },
};
