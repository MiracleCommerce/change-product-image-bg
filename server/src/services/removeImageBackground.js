const fs = require('fs');
const url = require('url');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const uploadProductImage = require('./uploadProductImage');
const { RemoveBgError, removeBackgroundFromImageUrl } = require('remove.bg');

dotenv.config();
const {
  REMOVE_BG_API_URL,
  REMOVE_BG_API_KEY,
  IMAGE_DIR_PATH
} = process.env;

const removeImageBackground = async ( imgUrl, bgColor ) => {
  try {
    const parsed = url.parse(imgUrl);
    const imgFileName = path.basename(parsed.pathname).split('.').slice(0, -1).join('.') + '.png';
    const outputFile = IMAGE_DIR_PATH + '/' + imgFileName;
    const imageUrl = imgUrl.split("?v=")[0];

    const result = await removeBackgroundFromImageUrl({
      url: imageUrl,
      apiKey: REMOVE_BG_API_KEY,
      size: "full",
      type: "product",
      bg_color: bgColor,
      outputFile
    });
    return imgFileName;
  } catch (err) {
    const errors = err;
    console.log(JSON.stringify(errors));
    return null;
  }
};

module.exports = removeImageBackground;