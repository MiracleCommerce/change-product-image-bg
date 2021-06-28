const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BackgroundGlobalSettingsSchema = new Schema({
  id: String,
  shop: String,
  accessToken: String,
  onoff: Boolean,
  appOnOff: Boolean,
  bgColor: String
});

module.exports = mongoose.model('BackgroundGlobalSettings', BackgroundGlobalSettingsSchema);