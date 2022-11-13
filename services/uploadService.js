const fs = require('fs');
const jimp = require('jimp');
require('dotenv').config();

const { BASE_URL } = process.env;

const setImage = async (name, filename, destination) => {
  const avatarName = `${name}_avatar.png`;
  jimp
    .read(`./tmp/${filename}`)
    .then(avatar => {
      return avatar
        .resize(700, 700) // resize
        .write(`./public/${destination}/${avatarName}`); // save
    })
    .catch(err => {
      console.error(err);
    });
  fs.unlink(`./tmp/${filename}`, err => {
    if (err) console.log(err);
    else console.log(`${filename} was deleted`);
  });
  const avatarURL = `${BASE_URL}/${destination}/${avatarName}`;
  return avatarURL;
};

module.exports = setImage;
