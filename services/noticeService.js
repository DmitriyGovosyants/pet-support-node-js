const { Notice, User } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;

const getByCategory = async (category, skip, limit) =>
  await Notice.find({ category: category })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);

const getByTitle = async title => await Notice.findOne({ title: title });

const getByID = async noticeID => {
  if (!isValid(noticeID)) return false;
  return await Notice.findById({ _id: noticeID });
};

const addByCategory = async (userID, notice, avatarURL) => {
  const newNotice = await Notice.create({ ...notice, avatarURL: avatarURL });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { notices: newNotice._id } }
  );
  if (newNotice && updateUser) {
    return newNotice;
  }
};

const addToFavoriteByNoticeID = async (userID, noticeID) => {
  //? Нужно ли добавлять проверку на валидность ID, так как с фронта он невалидный и не может прийти
  const { favoriteNotices } = await User.findOne({ _id: userID });
  if (favoriteNotices.includes(ObjectId(noticeID))) {
    return false;
  }
  return await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { favoriteNotices: noticeID } }
  );
};

module.exports = {
  getByCategory,
  getByID,
  getByTitle,
  addByCategory,
  addToFavoriteByNoticeID,
};
