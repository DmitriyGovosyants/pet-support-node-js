const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
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

  if (!token) {
    res.status(401).json({
      message: 'Email or password is wrong',
    });
    return;
  }
  const { email } = await findUserByEmail(req.body.email);
  res.status(200).json({
    token,
    data: {
      email,
    },
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
    const { email } = currentUser;
    res.status(200).json({
      data: {
        email,
      },
    });
  }
};

// Обновление данных юзера
const updateUserController = async (req, res) => {
  const { name, email, phone, birthdate, city } = req.body
  const user = await updateUser(req.user.id);

  if (!user) {
    return res.status(400).json({ message: 'missing fields' });
  } else if (user) {
    if (name) { user.name = name }
    if (email) { user.email = email }
    if (phone) { user.phone = phone }
    if (birthdate) { user.birthdate = birthdate }
    if (city) { user.city = city }
    await createUser(user)
    return res.status(200).json({
      data: {
        user,
      },
      status: 'Success',
    });
  }
  res.status(404).json({ message: 'Not found' });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateUserController,
};
