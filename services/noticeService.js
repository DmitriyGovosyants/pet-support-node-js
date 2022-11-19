const { Notice, User } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;
const { deleteFile } = require('./uploadService');

const getByCategory = async (category, search, field = 'title', skip, limit) =>
  await Notice.find({
    category: category,
    [field]: { $regex: search, $options: 'i' },
  })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .populate({ path: 'owner', select: 'email phone' });

const getByID = async noticeID => {
  if (!isValid(noticeID)) return false;
  return await Notice.findById({ _id: noticeID });
};

const addByCategory = async (userID, notice, avatarURL) => {
  const newNotice = await Notice.create({
    ...notice,
    avatarURL: avatarURL,
    owner: userID,
  });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { notices: newNotice._id } }
  );
  if (newNotice && updateUser) {
    return newNotice;
  }
};

const getFavorites = async userID => {
  const user = await User.findOne({ _id: userID }).populate('favoriteNotices');
  return user.favoriteNotices;
};

const getPrivates = async userID => {
  const user = await User.findOne({ _id: userID }).populate('notices');
  return user.notices;
};

const addToFavoriteByNoticeID = async (userID, noticeID) => {
  if (!isValid(noticeID)) return false;
  const { favoriteNotices } = await User.findOne({ _id: userID });
  if (favoriteNotices.includes(ObjectId(noticeID))) {
    return '409';
  }
  return await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { favoriteNotices: noticeID } }
  );
};

const deleteFromFavoriteByNoticeID = async (userID, noticeID) => {
  if (!isValid(noticeID)) return false;
  const { favoriteNotices } = await User.findOne({ _id: userID });
  if (!favoriteNotices.includes(ObjectId(noticeID))) {
    return false;
  }
  return await User.findByIdAndUpdate(
    { _id: userID },
    { $pull: { favoriteNotices: noticeID } }
  );
};

const deleteFromPrivateByNoticeID = async (userID, noticeID) => {
  if (!isValid(noticeID)) return false;
  const user = await User.findOne({ _id: userID });
  if (!user.notices.includes(ObjectId(noticeID))) {
    return false;
  }
  const { avatarURL } = await Notice.findByIdAndRemove({ _id: noticeID });
  if (avatarURL) {
    const pathToImage = avatarURL.slice(22, avatarURL.length);
    await deleteFile(pathToImage);
  }
  return await user.update({ $pull: { notices: noticeID } });
};

module.exports = {
  getByCategory,
  getByID,
  addByCategory,
  getFavorites,
  getPrivates,
  addToFavoriteByNoticeID,
  deleteFromFavoriteByNoticeID,
  deleteFromPrivateByNoticeID,
};
