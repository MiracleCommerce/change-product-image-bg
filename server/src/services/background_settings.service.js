const BackgroundGlobalSettings = require('../models/background_global_settings');
const BackgroundSettings = require('../models/background_settings');

// Global Background Settings Functions
const getAccessTokenByShop = async (shop) => { 
  const data = await BackgroundGlobalSettings.find({shop: shop});
  return data; 
};

const getGlobalBackgroundSettingsByShop = async (shop) => { 
  const data = await BackgroundGlobalSettings.find({shop: shop});
  return data; 
};

const addGlobalBackgroundSetting = async (shop, setting) => { 
  if(setting.accessToken) {
    let new_setting = new BackgroundGlobalSettings({ 
      shop: shop,
      onoff: setting.onoff,
      bgColor: setting.bgColor,
      appOnOff: setting.appOnOff,
      accessToken: setting.accessToken
    });
    new_setting.save();
  } else {
    let new_setting = new BackgroundGlobalSettings({ 
      shop: shop,
      onoff: setting.onoff,
      appOnOff: setting.appOnOff,
      bgColor: setting.bgColor
    });
    new_setting.save();
  }
  return;
};

const removeGlobalBackgroundSetting = async (shop, settingId) => {
  await BackgroundGlobalSettings.deleteMany({ id: { $eq: settingId } }); 
};

const updateGlobalBackgroundSetting = async (filter, setting) => {
  await BackgroundGlobalSettings.updateOne({ _id: filter }, { $set: setting });
};

// Additional Background Settings Functions
const getBackgroundSettingsByShop = async (shop) => { 
  const data = await BackgroundSettings.find({shop: shop}); 
  return data; 
};

const addBackgroundSetting = async (shop, setting) => { 
  let new_setting = new BackgroundSettings({ 
    shop: shop,
    onoff: setting.onoff,
    vendor: setting.vendor,
    bgColor: setting.bgColor
  });
 
  new_setting.save();
  return;
};

const removeBackgroundSetting = async (settingId) => {
  await BackgroundSettings.deleteOne({_id: settingId });
};

const updateBackgroundSetting = async (filter, setting) => {
  await BackgroundSettings.updateOne({ _id: filter }, { $set: setting });
};

module.exports = { getAccessTokenByShop, getGlobalBackgroundSettingsByShop, getBackgroundSettingsByShop, addGlobalBackgroundSetting, addBackgroundSetting, removeGlobalBackgroundSetting, removeBackgroundSetting, updateGlobalBackgroundSetting, updateBackgroundSetting };