const { News } = require('../models');

const newsController = async (req, res, next) => {
  const { search } = req.query;

  const allNews = await News.find({
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ],
  });

  if (allNews.length !== 0) {
    return res.json({
      code: 200,
      status: 'success',
      data: allNews,
      message: 'Get news success',
    });
  }
  next();
};

module.exports = newsController;
