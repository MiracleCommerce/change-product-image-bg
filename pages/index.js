// import React from 'react';
import React, { Component } from "react";
import Switch from "react-switch";
import { Button, Popover, ColorPicker, Stack, TextField, hsbToRgb, rgbToHsb, rgbString, Card, Layout, Page } from '@shopify/polaris';
import axios from 'axios';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      global_setting: {
        id: '',
        color: {
          hue: 300,
          brightness: 1,
          saturation: 0.7,
          alpha: 0
        },
        onoff: false,
        appOnOff: false,
        popOverActive: false
      },
      temp_setting: {
        color: {
          hue: 300,
          brightness: 1,
          saturation: 0.7,
          alpha: 0.8  
        },
        onoff: true,
        vendor: '',
        popOverActive: false
      },
      additional_list: [],
      update_flag: true,
      updating_flag: false,
      loading_flag: false,
      remove_flag: false
    };
  }

  getGlobalBackgroundSetting(){
    let { global_setting } = this.state;
    axios({
      url: '/get-global-background-settings',
      method: 'GET'
    })
    .then(res => {
      if(res.data.length > 0) {
        global_setting = {
          id: res.data[0]._id,
          color: this.rgbaToHSLA(res.data[0].bgColor),
          onoff: res.data[0].onoff,
          popOverActive: false,
          appOnOff: res.data[0].appOnOff,
        };
        this.setState({ global_setting });
      }
    });
  }

  getBackgroundSettings(){
    let { additional_list } = this.state;
    axios({
      url: '/get-background-settings',
      method: 'GET'
    })
    .then(res => {
      // if(res.data.length > 0) {
        additional_list = [];
        res.data.map((setting, key) => (
          additional_list.push(
            {
              id: setting._id,
              shop: setting.shop,
              color: this.rgbaToHSLA(setting.bgColor),
              onoff: setting.onoff,
              vendor: setting.vendor,
              popOverActive: false
            }
          )
        ));
        this.setState({ additional_list });
      // }
    });
  }

  componentDidMount(){
    this.getGlobalBackgroundSetting();
    this.getBackgroundSettings();
  }

  handleAddBlock() {
    let { additional_list, temp_setting, loading_flag } = this.state;
    loading_flag = true;
    this.setState({ loading_flag });

    if(!temp_setting.vendor) {
      alert('Product vendor should not be blank!');
      loading_flag = false;
      this.setState({ loading_flag });
      return;
    }

    var available_add = true;
    for(var i = 0; i < additional_list.length; i++) {
      if(additional_list[i].vendor == temp_setting.vendor) {
        available_add = false;
        break;
      }
    }
    if(!available_add) {
      alert('Product vendor should not be same.');
      loading_flag = false;
      this.setState({ loading_flag });
      return;
    }

    let bgColor = this.hsbaToRGBA(temp_setting.color);

    axios.post('/add-background-settings', {
        bgColor: bgColor,
        onoff: temp_setting.onoff,
        vendor: temp_setting.vendor
      }
    )
    .then(res => {
      this.getBackgroundSettings();
      temp_setting = {
        color: {
          hue: 300,
          brightness: 1,
          saturation: 0.7,
          alpha: 0.8  
        },
        onoff: true,
        vendor: '',
        popOverActive: false
      };
  
      loading_flag = false;
      this.setState({ temp_setting, loading_flag });
    });
  }

  // color convert
  hsbaToRGBA(color) {
    let rgbaColor = hsbToRgb({
      hue: color.hue,
      saturation: color.saturation,
      brightness: color.brightness
    });
    rgbaColor.alpha = color.alpha;

    let hexAlpha = Math.round(color.alpha * 255).toString(16);
    if (hexAlpha.length == 1)
      hexAlpha = "0" + hexAlpha;

    return rgbaColor.red + ',' + rgbaColor.green + ',' + rgbaColor.blue + ',' + rgbaColor.alpha;
  }

  rgbaToHSLA(rgbaColor) {
    const rgbaValues = rgbaColor.split(",");

    let r = rgbaValues[0] / 255;
    let g = rgbaValues[1] / 255;
    let b = rgbaValues[2] / 255;
    const v = Math.max(r, g, b),
      n = v - Math.min(r, g, b);
    const h =
      n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
    const hsbaColor = {
      hue: 60 * (h < 0 ? h + 6 : h),
      saturation: v && (n / v),
      brightness: v,
      alpha: rgbaValues[3]
    };
  
    return hsbaColor;
  }

  // Global Setting Functions
  handleGlobalOnOffAppChange(checked) {
    let { global_setting, update_flag } = this.state;
    global_setting.appOnOff = checked;
    update_flag = false;

    this.setState({ global_setting, update_flag });
  }

  handleGlobalOnOffChange(checked) {
    let { global_setting, update_flag } = this.state;
    global_setting.onoff = checked;
    update_flag = false;

    this.setState({ global_setting, update_flag });
  }

  handleGlobalColorChange(color_input) {
    let { global_setting, update_flag } = this.state;
    global_setting.color = color_input;
    update_flag = false;

    this.setState({ global_setting, update_flag });
  }

  handleGlobalRgbChange(value) {
    let { global_setting, update_flag } = this.state;
    const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
    global_setting.color = rgbToHsb({
      red: rgbValues[0],
      green: rgbValues[1],
      blue: rgbValues[2],
      alpha: rgbValues[3]
    });
    update_flag = false;

    this.setState({ global_setting, update_flag });
  }

  handleGlobalPopOverClose() {
    let { global_setting } = this.state;
    global_setting.popOverActive = false;

    this.setState({ global_setting });
  }

  handleGlobalPopOverOpen() {
    let { global_setting } = this.state;
    global_setting.popOverActive = true;

    this.setState({ global_setting });
  }

  //Temp Setting Functions
  handleTempColorChange(color_input) {
    let { temp_setting } = this.state;
    temp_setting.color = color_input;

    this.setState({ temp_setting });
  }

  handleTempOnOffChange(checked) {
    let { temp_setting } = this.state;
    temp_setting.onoff = checked;

    this.setState({ temp_setting });
  }

  handleTempRgbChange(value) {
    let { temp_setting } = this.state;
    const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
    temp_setting.color = rgbToHsb({
      red: rgbValues[0],
      green: rgbValues[1],
      blue: rgbValues[2],
      alpha: rgbValues[3]
    });
    this.setState({ temp_setting });
  }

  handleTempPopOverClose() {
    let { temp_setting } = this.state;
    temp_setting.popOverActive = false;

    this.setState({ temp_setting });
  }

  handleTempPopOverOpen() {
    let { temp_setting } = this.state;
    temp_setting.popOverActive = true;

    this.setState({ temp_setting });
  }

  handleTempVendorChange(value) {
    let { temp_setting } = this.state;
    temp_setting.vendor = value;

    this.setState({ temp_setting });
  }

  // Normal Setting Functions
  handleChange(key, checked) {
    let { additional_list, update_flag } = this.state;
    additional_list[key].onoff = checked;
    update_flag = false;

    this.setState({ additional_list, update_flag });
  }

  handleColorChange(key, color_input) {
    let { additional_list, update_flag } = this.state;
    additional_list[key].color = color_input;
    update_flag = false;

    this.setState({ additional_list, update_flag });
  }

  handleRgbChange(key, value) {
    let { additional_list, update_flag } = this.state;
    const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
    additional_list[key].color = rgbToHsb({
      red: rgbValues[0],
      green: rgbValues[1],
      blue: rgbValues[2],
      alpha: rgbValues[3]
    });
    update_flag = false;

    this.setState({ additional_list, update_flag });
  }

  handlePopoverClose(key) {
    let { additional_list } = this.state;
    additional_list[key].popOverActive = false;

    this.setState({ additional_list });
  }

  handlePopoverOpen(key) {
    let { additional_list } = this.state;
    additional_list[key].popOverActive = true;

    this.setState({ additional_list });
  }

  handleVendorChange(key, value) {
    let { additional_list, update_flag } = this.state;
    additional_list[key].vendor = value;
    update_flag = false;

    this.setState({ additional_list, update_flag });
  }

  handleRemoveBlock(key) {
    let { additional_list, remove_flag } = this.state;
    console.log(additional_list);
    if (confirm('Are you sure you want to delete this setting?')) {
      axios({
        url: '/delete-background-settings',
        data: {
          setting_id: additional_list[key].id
        },
        method: 'DELETE'
      })
      .then(res => {
        this.getBackgroundSettings();
      });
    }
    remove_flag = false;
    this.setState({ remove_flag });
  }

  handleSubmit() {
    let { global_setting, additional_list, update_flag, updating_flag } = this.state;
    update_flag = true;
    updating_flag = true;
    this.setState({ updating_flag });

    if(global_setting.id === '') {
      axios({
        url: '/add-global-background-settings',
        method: 'POST',
        data: {
          bgColor: this.hsbaToRGBA(global_setting.color),
          onoff: global_setting.onoff,
          appOnOff: global_setting.appOnOff
        },
      })
      .then(res => {
        this.getGlobalBackgroundSetting();
      });
    } else {
      axios({
        url: '/update-global-background-settings',
        method: 'POST',
        data: {
          id: global_setting.id,
          bgColor: this.hsbaToRGBA(global_setting.color),
          onoff: global_setting.onoff,
          appOnOff: global_setting.appOnOff
        },
      })
      .then(res => {
        this.getGlobalBackgroundSetting();
      });
    }

    if(additional_list.length > 0) {
      let list = [];
      for(let i = 0; i < additional_list.length; i++) {
        list.push({
          id: additional_list[i].id,
          settings_value: {
            bgColor: this.hsbaToRGBA(additional_list[i].color),
            onoff: additional_list[i].onoff,
            vendor: additional_list[i].vendor
          }
        });
      }
      axios({
        url: '/update-background-settings',
        method: 'POST',
        data: {
          additional_settings: list
        }
      })
      .then(res => {
        this.getBackgroundSettings();
      });
    }
    
    updating_flag = false;
    this.setState({ update_flag, updating_flag });
  }

  render() {
    const { global_setting, temp_setting, update_flag } = this.state;

    return (
      <Page title="Settings" primaryAction={{content: 'Save Settings', disabled: update_flag, onAction: this.handleSubmit.bind(this), loading: this.state.updating_flag}}>
        <Layout>
          <Layout.Section>
            <Card title="App Settings" sectioned>
              <Card.Section>
                <div class="setting-line app-setting">
                  <div class="left-group">
                    <Switch onChange={this.handleGlobalOnOffAppChange.bind(this)} checked={global_setting.appOnOff} />
                  </div>
                </div>
              </Card.Section>
            </Card>
          </Layout.Section>
          {
            global_setting.appOnOff ? (
              <Layout.Section>
                <Card title="Global Background" sectioned>
                  <Card.Section>
                    <div class="setting-line global-setting">
                      <div class="left-group">
                        <Switch onChange={this.handleGlobalOnOffChange.bind(this)} checked={global_setting.onoff} />
                        {
                          global_setting.onoff ? (
                            <Popover
                            active={global_setting.popOverActive}
                            activator={
                              <Button onClick={this.handleGlobalPopOverOpen.bind(this)}>
                                <Stack alignment="center" spacing="tight">
                                  <div
                                    style={{
                                      height: "2rem",
                                      width: "2rem",
                                      borderRadius: "0.3rem",
                                      background: rgbString(hsbToRgb(global_setting.color))
                                    }}
                                  />
                                  <span>Background color</span>
                                </Stack>
                              </Button>
                            }
                            onClose={this.handleGlobalPopOverClose.bind(this)}
                          >
                            <Popover.Section>
                              <ColorPicker
                                onChange={this.handleGlobalColorChange.bind(this)}
                                color={global_setting.color}
                                allowAlpha
                              />
                            </Popover.Section>
                            <Popover.Section>
                              <TextField value={rgbString(hsbToRgb(global_setting.color))} onChange={this.handleGlobalRgbChange.bind(this)} />
                            </Popover.Section>
                          </Popover>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </Card.Section>
                </Card>
                <Card title="Detail Backgrounds" sectioned>
                  <Card.Section>
                    <div id="content" role="main">
                      <div className="inner-block">
                        <div class="setting-line">
                          <div class="left-group">
                            <TextField value={temp_setting.vendor} onChange={this.handleTempVendorChange.bind(this)} />
                            <Switch onChange={this.handleTempOnOffChange.bind(this)} checked={temp_setting.onoff} />
                            <Popover
                              active={temp_setting.popOverActive}
                              activator={
                                <Button onClick={this.handleTempPopOverOpen.bind(this)}>
                                  <Stack alignment="center" spacing="tight">
                                    <div
                                      style={{
                                        height: "2rem",
                                        width: "2rem",
                                        borderRadius: "0.3rem",
                                        background: rgbString(hsbToRgb(temp_setting.color))
                                      }}
                                    />
                                    <span>Background color</span>
                                  </Stack>
                                </Button>
                              }
                              onClose={this.handleTempPopOverClose.bind(this)}
                            >
                              <Popover.Section>
                                <ColorPicker
                                  onChange={this.handleTempColorChange.bind(this)}
                                  color={temp_setting.color}
                                  allowAlpha
                                />
                              </Popover.Section>
                              <Popover.Section>
                                <TextField value={rgbString(hsbToRgb(temp_setting.color))} onChange={this.handleTempRgbChange.bind(this)} />
                              </Popover.Section>
                            </Popover>
                          </div>
                          <div class="right-group">
                            <Button id="add-block" onClick={this.handleAddBlock.bind(this)} loading={this.state.loading_flag}>Add a Condition</Button>
                          </div>
                        </div>
                        {
                          this.state.additional_list.map((block, key) => (
                            <div class="setting-line">
                              <div class="left-group">
                              <TextField value={block.vendor} onChange={this.handleVendorChange.bind(this, key)} disabled />
                                <Switch onChange={this.handleChange.bind(this, key)} checked={block.onoff} />
                                {
                                  block.onoff ? (
                                    <Popover
                                      active={block.popOverActive}
                                      activator={
                                        <Button onClick={this.handlePopoverOpen.bind(this, key)}>
                                          <Stack alignment="center" spacing="tight">
                                            <div
                                              style={{
                                                height: "2rem",
                                                width: "2rem",
                                                borderRadius: "0.3rem",
                                                background: rgbString(hsbToRgb(block.color))
                                              }}
                                            />
                                            <span>Background color</span>
                                          </Stack>
                                        </Button>
                                      }
                                      onClose={this.handlePopoverClose.bind(this, key)}
                                    >
                                      <Popover.Section>
                                        <ColorPicker
                                          onChange={this.handleColorChange.bind(this, key)}
                                          color={block.color}
                                          allowAlpha
                                        />
                                      </Popover.Section>
                                      <Popover.Section>
                                        <TextField value={rgbString(hsbToRgb(block.color))} onChange={this.handleRgbChange.bind(this, key)} />
                                      </Popover.Section>
                                    </Popover>
                                  ) : (
                                    <></>
                                  )
                                }
                              </div>
                              <div class="right-group">
                                <Button destructive onClick={this.handleRemoveBlock.bind(this, key)} loading={this.state.remove_flag}>Remove</Button>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </Layout.Section>
            ) : (
              <></>
            )
          }
        </Layout>
      </Page>
    );
  }
}

export default Index;
