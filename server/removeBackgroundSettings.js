const { removeBackgroundSetting } = require('./src/services/background_settings.service');

const removeBackgroundSettings = async (setting) => {
  return await removeBackgroundSetting(setting.setting_id);
};
  
module.exports = removeBackgroundSettings;