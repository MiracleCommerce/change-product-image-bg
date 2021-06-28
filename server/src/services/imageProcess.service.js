const ImageProcess = require('../models/image_process');

const getImageProcess = async (shop, imageId) => { 
  const data = await ImageProcess.find({shop: shop, image_id: imageId});
  return data; 
};

const addImageProcess = async (shop, imageId) => { 
  let newProcess = new ImageProcess({ 
    shop: shop,
    image_id: imageId
  });
  newProcess.save();
  return;
};

const removeImageProcess = async (imageId) => {
  await ImageProcess.deleteOne({image_id: imageId });
};

module.exports = { getImageProcess, addImageProcess, removeImageProcess };