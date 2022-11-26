const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const {
  uploadImage,
  // deleteImage,
  getAvatarUrl,
} = require('../services/google-cloud');

const tmpDirPath = path.join(__dirname, '..', '/', 'tmp');

const addAvatar = async (name, filename, destination) => {
  const avatarName = `${name}_avatar.png`;
  const tmpFilePath = `${tmpDirPath}/${filename}`;
  try {
    await jimp
      .read(tmpFilePath)
      .then(avatar => {
        return avatar.writeAsync(tmpFilePath);
      })
      .catch(err => {
        console.error(err);
      });
    await uploadImage(filename, avatarName, destination);
    await fs.unlink(tmpFilePath, err => {
      if (err) console.log(err);
      else console.log(`${filename} was deleted`);
    });
    // await deleteImage(imageURL, destination);
    return avatarName;
  } catch (error) {
    console.log(error);
  }
};

const setAvatarURL = async (filename, destination) =>
  await getAvatarUrl(filename, destination);

module.exports = { addAvatar, setAvatarURL };
