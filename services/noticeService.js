const { Notice, User } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;

const getByCategory = async (category, skip, limit) =>
  await Notice.find({ category: category })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);

const getByTitle = async title => await Notice.findOne({ title: title });

const getByID = async id => {
  if (!isValid(id)) return false;
  return await Notice.findById({ _id: id });
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

module.exports = {
  getByCategory,
  getByID,
  getByTitle,
  addByCategory,
};
