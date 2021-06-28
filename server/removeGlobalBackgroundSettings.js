const { removeBackgroundSetting } = require('./src/services/background_settings.service');

const removeGlobalBackgroundSettings = async (productIds, shop) => {
  return await removeBackgroundSetting(shop, productIds);
};
  
module.exports = removeGlobalBackgroundSettings;