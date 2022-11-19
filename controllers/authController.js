const { userService, registration, login, logout } = require('../services');
const { findUserByEmail } = userService;

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      code: 409,
      message: 'Email is invalid',
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
  if (!password || !email) {
    res.status(401).json({
      code: 401,
      message: 'Fill in all the fields',
    });
    return;
  }
  const result = await login(email, password);
  if (result === 'invalidEmail') {
    res.status(401).json({
      code: 401,
      message: 'Email is wrong',
    });
    return;
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
      token: result,
    },
  });
};

// Выход юзера
const logoutController = async (req, res) => {
  const { id, token } = req.user;
  await logout(id, token);
  res.json({
    code: 200,
    message: 'Logout Success',
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
