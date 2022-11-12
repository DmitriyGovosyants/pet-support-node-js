const { noticeService } = require('../services');

const { getByCategory, getByID, getByTitle, addByCategory } = noticeService;

const testUserID = '636fac344bd522a48c435578';

const getNoticesByCategory = async (req, res, next) => {
  const { page, limit = 10, category } = req.query;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const results = await getByCategory(
    category,
    parseInt(skip),
    parseInt(limit)
  );
  if (results.length === 0) {
    next();
  }
  console.log(results);
  if (results && results.length < 10) {
    res.json({
      status: 'success',
      data: { notices: results },
      message: 'Notices ended',
    });
    return;
  }
  res.json({
    status: 'success',
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
    status: 'success',
    data: { notice: result },
  });
};

const createNotice = async (req, res, next) => {
  const notice = req.body;
  const avatarURL = req.avatarURL;
  const findNotice = await getByTitle(notice.title);
  if (findNotice) {
    res.status(409).json({
      status: 'failed',
      message: 'Already exists',
    });
    return;
  }
  const result = await addByCategory(testUserID, notice, avatarURL);
  res.status(201).json({
    status: 'success',
    data: {
      notice: result,
    },
  });
};

module.exports = { getNoticesByCategory, getNoticeByID, createNotice };
