// const FileType = require('file-type');
const { uploadService } = require('../services');

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const fileLoader = async (req, res, next) => {
  const { fileTypeFromFile } = await import('file-type');
  const { name } = req.body;
  const { filename } = req.file;
  const destination = req.baseUrl.slice(5, req.baseUrl.length);
  console.log(destination);
  const meta = await fileTypeFromFile(req.file.path);
  if (!whitelist.includes(meta.mime)) {
    next(res.status(415).json({ message: 'Unsupported media type' }));
  }
  const userAvatar = await uploadService(name, filename, destination);
  req.avatarURL = userAvatar;
  next();
};

module.exports = fileLoader;
