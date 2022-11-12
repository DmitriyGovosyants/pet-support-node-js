const errorHandler = middleware => {
  return async function (req, res, next) {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = errorHandler;
