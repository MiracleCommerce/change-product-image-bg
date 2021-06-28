const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BackgroundSettingsSchema = new Schema({
  id: String,
  shop: String,
  onoff: Boolean,
  vendor: String,
  bgColor: String
});

module.exports = mongoose.model('BackgroundSettings', BackgroundSettingsSchema);