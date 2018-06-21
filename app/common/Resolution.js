/**
 * Created by chintec on 2018/3/21.
 */
import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
  View
} from 'react-native';

let props = {};
export default class Resolution {
  static get(useFixWidth = true){
    return useFixWidth?{...props.fw}:{...props.fh}
  }

  static setDesignSize(dwidth=1920,dheight=1200,dim="window"){
    let designSize = {width:dwidth,height:dheight};

    //let navHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 64;
    let navHeight = 0
    let pxRatio = PixelRatio.get(dim);
    let {width,height} = Dimensions.get(dim);
    if(dim != "screen")height-=navHeight;
    let w = PixelRatio.getPixelSizeForLayoutSize(width);
    let h = PixelRatio.getPixelSizeForLayoutSize(height);

    let fw_design_scale = designSize.width/w;
    fw_width = designSize.width;
    fw_height = h*fw_design_scale;
    fw_scale = 1/pxRatio/fw_design_scale;

    let fh_design_scale = designSize.height/h;
    fh_width = w*fh_design_scale;
    fh_height = designSize.height;
    fh_scale = 1/pxRatio/fh_design_scale;

    props.fw = {width:fw_width,height:fw_height,scale:fw_scale,navHeight};
    props.fh = {width:fh_width,height:fh_height,scale:fh_scale,navHeight};
  }

  static FixWidthView = (p) => {
    let {width,height,scale,navHeight} = props.fw;
    return (
      <View {...p} style={{
        marginTop:navHeight,
        width:width,
        height:height,
        backgroundColor: 'transparent',
        transform:[{translateX:-width*.5},
          {translateY:-height*.5},
          {scale:scale},
          {translateX:width*.5},
          {translateY:height*.5}]
      }}>
      </View>
    );
  };

  static FixHeightView = (p) => {
    let {width,height,scale,navHeight} = props.fh;
    return (
      <View {...p} style={{
        marginTop:navHeight,
        width:width,
        height:height,
        backgroundColor: 'transparent',
        transform:[{translateX:-width*.5},
          {translateY:-height*.5},
          {scale:scale},
          {translateX:width*.5},
          {translateY:height*.5}]
      }}>
        {p.children}
      </View>
    );
  };
};
//init
Resolution.setDesignSize();