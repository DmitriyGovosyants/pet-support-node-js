const express = require('express');
const {
  noticeValidation,
  errorHandler,
  fileLoader,
} = require('../../middlewares');
const { upload } = require('../../helpers');
const { noticeController } = require('../../controllers');
const router = express.Router();

const { getNoticesByCategory, getNoticeByID, addNotice, addToFavorite } =
  noticeController;

//створити ендпоінт для отримання оголошень по категоріям - DONE
router.get('/', errorHandler(getNoticesByCategory));

//створити ендпоінт для додавання оголошень відповідно до обраної категорії - DONE
router.post(
  '/',
  upload.single('avatar'),
  noticeValidation,
  fileLoader,
  errorHandler(addNotice)
);

//створити ендпоінт для отримання одного оголошення - DONE
router.get('/:noticeID', errorHandler(getNoticeByID));

//створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
router.get('/favorites', errorHandler());

//створити ендпоінт для додавання оголошення до обраних - DONE
router.patch('/favorites/:noticeID', errorHandler(addToFavorite));

//створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
router.delete('/favorites/:noticeID', errorHandler());

//створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
router.get('/private', errorHandler());

//створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
router.delete('/private', errorHandler());

module.exports = router;
