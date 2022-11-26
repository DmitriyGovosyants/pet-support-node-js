const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'pets-rest-api-avatars';
const tmpDirPath = path.join(__dirname, '..', '/', 'tmp');
const baseURL = 'https://storage.googleapis.com';

async function uploadImage(fileName, avatarName, destination) {
  const filePath = `${tmpDirPath}/${fileName}`;
  const options = {
    destination: `${destination}/${avatarName}`,
    metadata: {
      cacheControl: 'no-store',
    },
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

async function deleteImage(imageURL, destination) {
  if (!imageURL) {
    return;
  }
  const fileName = imageURL.slice(imageURL.length - 23, imageURL.length);
  const path = `${destination}/${fileName}`;
  console.log(`filename:${fileName}`);
  await storage.bucket(bucketName).file(path).delete();

  console.log(`gs://${bucketName}/${fileName} deleted`);
}

async function getAvatarUrl(fileName, destination) {
  return `${baseURL}/${bucketName}/${destination}/${fileName}`;
}

module.exports = { uploadImage, deleteImage, getAvatarUrl };
