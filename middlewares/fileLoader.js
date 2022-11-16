const { customAlphabet } = require('nanoid');
const { addAvatar } = require('../services');

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const nanoid = customAlphabet('1234567890abcdef', 6);

const fileLoader = async (req, res, next) => {
  const { fileTypeFromFile } = await import('file-type');
  if (!req.file) {
    next();
    return;
  }
  const { name } = req.body;
  const { filename } = req.file;
  const uniqueName = `${name}${nanoid()}`;
  const destination = req.baseUrl.slice(5, req.baseUrl.length);
  const meta = await fileTypeFromFile(req.file.path);
  if (!whitelist.includes(meta.mime)) {
    next(res.status(415).json({ message: 'Unsupported media type' }));
  }
  const userAvatar = await addAvatar(uniqueName, filename, destination);
  req.avatarURL = userAvatar;
  next();
};

module.exports = fileLoader;
