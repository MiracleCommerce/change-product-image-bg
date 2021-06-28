const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageProcessSchema = new Schema({
  id: String,
  shop: String,
  image_id: String
});

module.exports = mongoose.model('ImageProcess', ImageProcessSchema);