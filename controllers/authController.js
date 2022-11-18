const { userService, registration, login, logout } = require('../services');
const { findUserByEmail } = userService;

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      code: 409,
      message: 'Email in use',
    });
  }
  const token = await registration(req.body);
  res.status(201).json({
    code: 201,
    status: 'success',
    data: { token: token },

    message: 'Registration success',
  });
};

// Вход юзера
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  if (result === 'invalidEmail') {
    res.status(401).json({
      code: 401,
      message: 'Email is wrong',
    });
  }
  if (result === 'invalidPassword') {
    res.status(401).json({
      code: 401,
      message: 'Password is wrong',
    });
    return;
  }
  res.json({
    code: 200,
    data: {
      result,
    },
  });
};

// Выход юзера
const logoutController = async (req, res) => {
  const { id, token } = req.user;
  await logout(id, token);
  res.json({
    code: 200,
    message: 'Logoout Success',
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
