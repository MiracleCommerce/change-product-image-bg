const { addGlobalBackgroundSetting } = require('./src/services/background_settings.service');

const addGlobalBackgroundSettings = async (shop, setting) => {
  return await addGlobalBackgroundSetting(shop, setting);
};
  
module.exports = addGlobalBackgroundSettings;