const { noticeService } = require('../services');

const {
  getByCategory,
  getByID,
  addByCategory,
  addNoticeAvatar,
  getFavorites,
  getPrivates,
  addToFavoriteByNoticeID,
  deleteFromFavoriteByNoticeID,
  deleteFromPrivateByNoticeID,
} = noticeService;

const getNoticesByCategory = async (req, res, next) => {
  const { page, limit = 10, category, search, field } = req.query;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const results = await getByCategory(
    category,
    search,
    field,
    parseInt(skip),
    parseInt(limit)
  );
  if (results.length === 0) {
    next();
    return;
  }
  if (results && results.length < 10) {
    res.json({
      code: 200,
      status: 'Success',
      data: { notices: results },
      message: 'Notices ended',
    });
    return;
  }
  res.json({
    code: 200,
    status: 'Success',
    data: {
      notices: results,
    },
    page,
    limit,
  });
};

const getNoticeByID = async (req, res, next) => {
  const { noticeID } = req.params;
  const result = await getByID(noticeID);
  if (!result) {
    next();
  }
  res.json({
    code: 200,
    status: 'Success',
    data: { notice: result },
  });
};

const addNotice = async (req, res, next) => {
  const user = req.user;
  const notice = req.body;
  const newNotice = await addByCategory(user._id, notice);
  req.result = newNotice;
  next();
};

const addAvatar = async (req, res, next) => {
  const avatarURL = req.avatarURL;
  const notice = req.result;
  const result = await addNoticeAvatar(avatarURL, notice);
  if (!result) {
    res.status(500).json({
      code: 500,
      status: 'Failed',
      message: 'Upload avatar failed, try again',
    });
  }
  res.status(201).json({
    code: 201,
    status: 'Success',
    data: {
      notice: result,
    },
  });
};

const getFavoriteNotices = async (req, res, next) => {
  const user = req.user;
  const result = await getFavorites(user._id);
  res.json({
    code: 200,
    status: 'Success',
    data: {
      favoriteNotices: result,
    },
  });
};

const getPrivateNotices = async (req, res, next) => {
  const user = req.user;
  const result = await getPrivates(user._id);
  res.json({
    code: 200,
    status: 'Success',
    data: {
      notices: result,
    },
  });
};

const addToFavorite = async (req, res, next) => {
  const user = req.user;
  const { noticeID } = req.params;
  const result = await addToFavoriteByNoticeID(user._id, noticeID);
  if (result === '409') {
    res.status(409).json({
      code: 409,
      status: 'failed',
      message: 'Already added',
    });
    return;
  }
  if (result) {
    res.json({
      code: 200,
      status: 'Success',
      message: 'Added to favorites',
    });
  } else {
    next();
  }
};

const deleteFromFavorite = async (req, res, next) => {
  const user = req.user;
  const { noticeID } = req.params;
  const result = await deleteFromFavoriteByNoticeID(user._id, noticeID);
  if (result) {
    res.json({
      code: 200,
      status: 'Success',
      message: 'Deleted from favorites',
    });
  } else {
    next();
  }
};

const deleteFromPrivate = async (req, res, next) => {
  const user = req.user;
  const { noticeID } = req.params;
  const result = await deleteFromPrivateByNoticeID(user._id, noticeID);
  if (result) {
    res.json({
      code: 200,
      status: 'Success',
      message: 'Deleted from private',
    });
  } else {
    next();
  }
};

module.exports = {
  getNoticesByCategory,
  getNoticeByID,
  addNotice,
  addAvatar,
  getFavoriteNotices,
  getPrivateNotices,
  addToFavorite,
  deleteFromFavorite,
  deleteFromPrivate,
};
