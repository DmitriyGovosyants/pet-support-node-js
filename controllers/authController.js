const {
  createUser,
  // findUserById,
  findUserByEmail,
} = '../services/userService.js';

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    return res.status(409).json({ message: 'Email in use' });
  }

  const email = await createUser(req.body);
  res.status(201).json({
    user: {
      email,
    },
  });
};

module.exports = {
  registerController,
};
