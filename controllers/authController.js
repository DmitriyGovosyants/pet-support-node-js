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
  // const { name, email, birthday, phone, sity } = req.body;
  const user = await updateUser(req.user.id, req.body);

  if (!user) {
    return res.status(400).json({ message: 'missing fields' });
  } else if (user) {
    return res.status(200).json({
      data: {
        user,
      },
      status: 'Success',
    });
  }
  res.status(404).json({ message: 'Not found' });
};

// const updateContactPartial = async (req, res) => {
//     try {
//         const { name, email, phone, favorite } = req.body
//         const { id } = req.params
//         const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
//         if (!contact) {
//             return res
//                 .status(404)
//                 .json({ message: Contacts with id '${id}' not found })
//         } else {
//             if (name) { contact.name = name }
//             if (email) { contact.email = email }
//             if (phone) { contact.phone = phone }
//             if (favorite) { contact.favorite = favorite }
//         }
//         await Contact.create(contact)
//         res.status(201).json(contact);
//     } catch (error) {
//         console.log('updateContact', error.message)
//     }
// }

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateUserController,
};
