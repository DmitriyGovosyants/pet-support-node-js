const { Notice, User } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;
const { deleteImage } = require('./google-cloud');

const getByCategory = async (
  category,
  search = '',
  field = 'title',
  skip,
  limit
) => {
  const results = await Notice.find({
    category: category,
    [field]: { $regex: search, $options: 'i' },
  })
    .select({ createdAt: 0, updatedAt: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Notice.countDocuments({
    category: category,
    [field]: { $regex: search, $options: 'i' },
  });
  return { results, total };
};

const getByID = async noticeID => {
  if (!isValid(noticeID)) return false;
  return await Notice.findById({ _id: noticeID });
};

const addByCategory = async (userID, notice) => {
  const newNotice = await Notice.create({
    ...notice,
  });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { notices: newNotice._id } }
  );
  newNotice.owner = { email: updateUser.email, phone: updateUser.phone };
  await newNotice.save();
  if (newNotice && updateUser) {
    return newNotice;
  }
};

const addNoticeAvatar = async (avatarURL, notice) => {
  const avatar = await Notice.findByIdAndUpdate(
    { _id: notice._id },
    {
      avatarURL: avatarURL,
    },
    { new: true }
  ).select({ createdAt: 0, updatedAt: 0 });
  if (!avatar) {
    return null;
  }
  return avatar;
};

const getFavorites = async (userID, skip, limit) => {
  const user = await User.findOne({ _id: userID }).populate({
    path: 'favoriteNotices',
    options: {
      limit: limit,
      sort: { createdAt: -1 },
      skip: skip,
    },
    select: '-createdAt -updatedAt',
  });
  const results = user.favoriteNotices;
  const { favoriteNotices } = await User.findOne({ _id: userID });
  const total = favoriteNotices.length;
  return { results, total };
};

const getPrivates = async (userID, skip, limit) => {
  const user = await User.findOne({ _id: userID }).populate({
    path: 'notices',
    options: {
      limit: limit,
      sort: { createdAt: -1 },
      skip: skip,
    },
    select: '-createdAt -updatedAt -owner',
  });
  const results = user.notices;
  const { notices } = await User.findOne({ _id: userID });
  const total = notices.length;
  return { results, total };
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
  const destination = 'notices';
  if (avatarURL) {
    await deleteImage(avatarURL, destination);
  }
  return await user.update({ $pull: { notices: noticeID } });
};

module.exports = {
  getByCategory,
  getByID,
  addByCategory,
  addNoticeAvatar,
  getFavorites,
  getPrivates,
  addToFavoriteByNoticeID,
  deleteFromFavoriteByNoticeID,
  deleteFromPrivateByNoticeID,
};
