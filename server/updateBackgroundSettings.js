const { updateBackgroundSetting } = require('./src/services/background_settings.service');

const updateBackgroundSettings = async (settings_list) => {
  let settings = settings_list.additional_settings;
  for(var i = 0; i < settings.length; i++) {
    updateBackgroundSetting(settings[i].id, settings[i].settings_value);
  }
  return;
};
  
module.exports = updateBackgroundSettings;