const {
  createUser,
  findUserByEmail,
  findUserById,
} = require('../services/userService.js');

const { login, logout } = require('../services/authService');

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    return res.status(409).json({ message: 'Email in use' });
  }

  const email = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      email: email,
    },
    message: 'Registration success',
  });
};

// Вход юзера
const loginController = async (req, res) => {
  const token = await login(req.body);

  if (token) {
    const { email } = await findUserByEmail(req.body.email);
    res.status(200).json({
      token,
      data: {
        email,
      },
    });
  }
  res.status(401).json({
    message: 'Email or password is wrong',
  });
};

// Выход юзера
const logoutController = async (req, res) => {
  await logout(req.user.id);
  res.status(204).json({ message: 'No Content' });
};

// Текущий юзер
const currentUserController = async (req, res) => {
  const currentUser = await findUserById(req.user.id);

  if (currentUser) {
    const { email, subscription } = currentUser;
    res.status(200).json({ email, subscription });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
};
