const express = require('express');
const {
  noticeValidation,
  authentificate,
  fileLoader,
} = require('../../middlewares');
const { upload, ctrlWrapper } = require('../../helpers');
const { noticeController } = require('../../controllers');
const router = express.Router();

const {
  getNoticesByCategory,
  getNoticeByID,
  getFavoriteNotices,
  addNotice,
  addToFavorite,
  deleteFromFavorite,
} = noticeController;

router.get('/', ctrlWrapper(getNoticesByCategory));

router.post(
  '/',
  authentificate,
  upload.single('avatar'),
  noticeValidation,
  fileLoader,
  ctrlWrapper(addNotice)
);

router.get('/favorites', authentificate, ctrlWrapper(getFavoriteNotices));

router.get('/private', ctrlWrapper());

router.get('/:noticeID', ctrlWrapper(getNoticeByID));

router.patch(
  '/favorites/:noticeID',
  authentificate,
  ctrlWrapper(addToFavorite)
);

router.delete(
  '/favorites/:noticeID',
  authentificate,
  ctrlWrapper(deleteFromFavorite)
);

router.delete('/private', ctrlWrapper());

module.exports = router;
