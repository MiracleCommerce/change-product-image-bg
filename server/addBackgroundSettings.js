const { addBackgroundSetting } = require('./src/services/background_settings.service');

const addBackgroundSettings = async (shop, setting) => {
  return await addBackgroundSetting(shop, setting);
};
  
module.exports = addBackgroundSettings;