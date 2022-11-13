const express = require('express');
const {
  noticeValidation,
  authentificate,
  fileLoader,
} = require('../../middlewares');
const { upload, ctrlWrapper } = require('../../helpers');
const { noticeController } = require('../../controllers');
const router = express.Router();

const { getNoticesByCategory, getNoticeByID, addNotice, addToFavorite } =
  noticeController;

router.get('/', ctrlWrapper(getNoticesByCategory));

router.post(
  '/',
  authentificate,
  upload.single('avatar'),
  noticeValidation,
  fileLoader,
  ctrlWrapper(addNotice)
);

router.get('/:noticeID', ctrlWrapper(getNoticeByID));

router.get('/favorites', ctrlWrapper());

router.patch(
  '/favorites/:noticeID',
  authentificate,
  ctrlWrapper(addToFavorite)
);

router.delete('/favorites/:noticeID', ctrlWrapper());

router.get('/private', ctrlWrapper());

router.delete('/private', ctrlWrapper());

module.exports = router;
