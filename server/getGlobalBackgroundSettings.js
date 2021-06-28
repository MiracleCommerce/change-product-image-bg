const { getGlobalBackgroundSettingsByShop } = require('./src/services/background_settings.service');

const getGlobalBackgroundSettings = async (shop) => {
    return await getGlobalBackgroundSettingsByShop(shop);
};
  
module.exports = getGlobalBackgroundSettings;