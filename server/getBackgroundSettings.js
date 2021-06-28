const { getBackgroundSettingsByShop } = require('./src/services/background_settings.service');

const getBackgroundSettings = async (shop) => {
    return await getBackgroundSettingsByShop(shop);
};
  
module.exports = getBackgroundSettings;