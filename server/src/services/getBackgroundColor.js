const { getGlobalBackgroundSettingsByShop, getBackgroundSettingsByShop } = require('./background_settings.service');
// const hsl = require('hsl-to-hex');

const getBackgroundColor = async (shop, productVendor) => {

  const globalBackgroundSettings = await getGlobalBackgroundSettingsByShop(shop);
  const backgroundSettings = await getBackgroundSettingsByShop(shop);
  let backgroundColor = '';
  if(globalBackgroundSettings[0].appOnOff) {
    if(backgroundSettings.length > 0) {
      for(var i = 0; i < backgroundSettings.length; i++) {
        if(backgroundSettings[i].vendor.trim() == productVendor && backgroundSettings[i].onoff) {
          backgroundColor = backgroundSettings[i].bgColor;
          break;
        }
      }
    }
  
    if(backgroundColor == '') {
      if(globalBackgroundSettings[0].onoff) {
        backgroundColor = globalBackgroundSettings[0].bgColor
      } else {
        return false;
      }
    }
  
    const backgroundColorSplit = backgroundColor.split(',');
    let hexRed = parseInt(backgroundColorSplit[0]).toString(16);
    let hexGreen = parseInt(backgroundColorSplit[1]).toString(16);
    let hexBlue = parseInt(backgroundColorSplit[2]).toString(16);
    let hexAlpha = Math.round(backgroundColorSplit[3] * 255).toString(16);
  
    if (hexRed.length == 1)
      hexRed = "0" + hexRed;
    if (hexGreen.length == 1)
      hexGreen = "0" + hexGreen;
    if (hexBlue.length == 1)
      hexBlue = "0" + hexBlue;
    if (hexAlpha.length == 1)
      hexAlpha = "0" + hexAlpha;
    backgroundColor = hexRed + hexGreen + hexBlue + hexAlpha;
  
    return backgroundColor;
  } else {
    return false;
  }
};

module.exports = getBackgroundColor;