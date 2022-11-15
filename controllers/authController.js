const {
  createUser,
  findUserByEmail,
  updateUser,
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

  const newUser = await createUser(req.body);
  res.status(201).json({
    code: 201,
    status: 'success',
    data: newUser,

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

// Обновление данных юзера
const updateUserController = async (req, res) => {
  const { name, email, phone, birthdate, city } = req.body;
  const user = await updateUser(req.user.id);

  if (!user) {
    return res.status(400).json({ message: 'missing fields' });
  } else if (user) {
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (birthdate) {
      user.birthdate = birthdate;
    }
    if (city) {
      user.city = city;
    }
    await createUser(user);
    return res.json({
      code: 200,
      data: {
        user,
      },
      status: 'Success',
    });
  }
  res.status(404).json({
    code: 404,
    message: 'Not found',
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  updateUserController,
};
