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
  const { page, limit = 12, category, search, field } = req.query;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const numberPage = parseInt(page);
  const { results, total } = await getByCategory(
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
  if (results && results.length < 12) {
    res.json({
      code: 200,
      status: 'Success',
      data: { notices: results },
      total: total,
    });
    return;
  }
  res.json({
    code: 200,
    status: 'Success',
    data: {
      notices: results,
    },
    total: total,
    page: numberPage,
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
  const { page, limit = 12 } = req.query;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const numberPage = parseInt(page);
  const user = req.user;
  const { results, total } = await getFavorites(
    user._id,
    parseInt(skip),
    parseInt(limit)
  );
  if (results && results.length < 12) {
    res.json({
      code: 200,
      status: 'Success',
      data: { notices: results },
      total: total,
    });
    return;
  }
  res.json({
    code: 200,
    status: 'Success',
    data: {
      notices: results,
    },
    total: total,
    page: numberPage,
    limit,
  });
};

const getPrivateNotices = async (req, res, next) => {
  const { page, limit = 12 } = req.query;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const numberPage = parseInt(page);
  const user = req.user;
  const { results, total } = await getPrivates(
    user._id,
    parseInt(skip),
    parseInt(limit)
  );
  if (results && results.length < 12) {
    res.json({
      code: 200,
      status: 'Success',
      data: { notices: results },
      total: total,
    });
    return;
  }
  res.json({
    code: 200,
    status: 'Success',
    data: {
      notices: results,
    },
    total: total,
    page: numberPage,
    limit,
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
