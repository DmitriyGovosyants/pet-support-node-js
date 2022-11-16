const {
  createUser,
  findUserByEmail,
  login,
  logout,
} = require('../services');

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      code: 409,
      message: 'Email in use',
    });
  }

  const { token, email } = await createUser(req.body);
  res.status(201).json({
    code: 201,
    status: 'success',
    data: { token, email },

    message: 'Registration success',
  });
};

// Вход юзера
const loginController = async (req, res) => {
  const { token } = await login(req.body);

  if (!token) {
    res.status(401).json({
      code: 401,
      message: 'Email or password is wrong',
    });
    return;
  }
  const { email } = await findUserByEmail(req.body.email);
  res.json({
    code: 200,
    data: {
      token,
      email,
    },
  });
};

// Выход юзера
const logoutController = async (req, res) => {
  await logout(req.user.id);
  res.status(204).json({
    code: 204,
    message: 'No Content',
  });
};



module.exports = {
  registerController,
  loginController,
  logoutController,
};
