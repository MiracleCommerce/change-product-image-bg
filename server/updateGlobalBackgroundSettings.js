const { updateGlobalBackgroundSetting } = require('./src/services/background_settings.service');

const updateGlobalBackgroundSettings = async (setting) => {
  if(setting.accessToken) {
    updateGlobalBackgroundSetting(setting.id, {
      bgColor: setting.bgColor,
      onoff: setting.onoff,
      appOnOff: setting.appOnOff,
      accessToken: setting.accessToken
    });
  } else {
    updateGlobalBackgroundSetting(setting.id, {
      bgColor: setting.bgColor,
      onoff: setting.onoff,
      appOnOff: setting.appOnOff,
    });
  }
  return;
};
  
module.exports = updateGlobalBackgroundSettings;