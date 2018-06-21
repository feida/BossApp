import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { createAction, NavigationActions, Storage } from "../utils";
import Screen from "../common/ScreenUtil";

let { height, width } = Dimensions.get("window");
@connect(({ app, search }) => ({ ...app, ...search }))
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalOrder: this.props.totalOrder,
      historyArr: [],
      text: ""
    };
    this.active = this.props.active;
  }

  async storageHistory() {
    let historyArr = await Storage.get("historySearch");
    if (historyArr && historyArr.length > 0) {
      this.setState({
        historyArr: historyArr
      });
    }
  }
  componentWillMount() {
    this.storageHistory();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalOrder: nextProps.totalOrder
    });
  }
  render() {
    let img_1 = this.active
      ? require("../images/active_02.png")
      : require("../images/active_01.png");
    let img_2 = this.active
      ? require("../images/history_01.png")
      : require("../images/history_02.png");
    let color1 = this.active ? "#FFBF34" : "#000";
    let color2 = this.active ? "#000" : "#FFBF34";
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            width: Screen.s(1219),
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={styles.totalOrderStyle}>
            <Text style={{ fontSize: Screen.t(40), color: "#FFBF34" }}>
              {this.state.totalOrder}
            </Text>
          </View>
          <View style={{ width: Screen.s(350) }}>
            <TouchableOpacity
              style={styles.orderStyle}
              activeOpacity={1}
              onPress={this.changeActive.bind(this, true)}
            >
              <Image
                source={img_1}
                style={{
                  width: Screen.s(53),
                  height: Screen.s(53),
                  marginRight: Screen.s(13)
                }}
              />
              <Text style={{ fontSize: Screen.t(40), color: color1 }}>
                当前订单
              </Text>
            </TouchableOpacity>
            {this.active && (
              <View
                style={{
                  width: Screen.s(350),
                  height: Screen.s(8),
                  backgroundColor: "#FFBF34",
                  position: "absolute",
                  left: 0,
                  bottom: -Screen.s(8),
                  zIndex: 10
                }}
              />
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.orderStyle}
              activeOpacity={1}
              onPress={this.changeActive.bind(this, false)}
            >
              <Image
                source={img_2}
                style={{
                  width: Screen.s(53),
                  height: Screen.s(53),
                  marginRight: Screen.s(13)
                }}
              />
              <Text style={{ fontSize: Screen.t(40), color: color2 }}>
                历史订单
              </Text>
            </TouchableOpacity>
            {!this.active && (
              <View
                style={{
                  width: Screen.s(350),
                  height: Screen.s(8),
                  backgroundColor: "#FFBF34",
                  position: "absolute",
                  left: 0,
                  bottom: -Screen.s(8),
                  zIndex: 10
                }}
              />
            )}
          </View>
        </View>
        {this.searchBar()}
      </View>
    );
  }

  searchBar() {
    if (this.active) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: Screen.s(473)
          }}
        >
          <View>
            <Image
              source={require("../images/pc.png")}
              style={{ width: Screen.s(65), height: Screen.s(65) }}
            />
            <Image
              source={require("../images/warn.png")}
              style={{
                width: Screen.s(37),
                height: Screen.s(37),
                position: "absolute",
                right: 0,
                bottom: Screen.s(10)
              }}
            />
          </View>
          <TouchableOpacity>
            <Image
              source={require("../images/update.png")}
              style={{
                width: Screen.s(53),
                height: Screen.s(53),
                marginLeft: Screen.s(104)
              }}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#FFBF34",
              borderRadius: Screen.s(10)
            }}
          >
            <Image
              source={require("../images/search.png")}
              style={{
                width: Screen.s(34),
                height: Screen.s(34),
                marginLeft: Screen.s(18),
                marginRight: Screen.s(24)
              }}
            />
            <TextInput
              ref={component => (this._textInput = component)}
              onChangeText={text => this.onChangeText(text)}
              style={{
                width: Screen.s(230),
                height: Screen.s(55),
                padding: 0,
                fontSize: Screen.t(36),
                color: "#FFBF34"
              }}
              maxLength={10}
              autoFocus={false}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity
            style={{
              marginLeft: Screen.s(30),
              width: Screen.s(80),
              height: Screen.s(55),
              backgroundColor: "#FFBF34",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: Screen.s(10)
            }}
            onPress={this.search.bind(this)}
          >
            <Text style={{ fontSize: Screen.t(30), color: "#fff" }}>搜索</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  onChangeText(text) {
    this.setState({
      text: text
    });
  }

  search() {
    let listArr = [];
    let str = this.state.text.replace(/(^s*)|(s*$)/g, "");
    if (str !== "") {
      this.props.dispatch(createAction("search/isSearch")(true));
      this.state.historyArr.length > 0 &&
        this.state.historyArr.map((v, i) => {
          if (v.orderNumber === str) {
            listArr.push(v);
          }
        });
      this.props.dispatch(createAction("search/upDateSearchData")(listArr));
    }
  }

  changeActive(e) {
    this.active = e;
    this.props.dispatch(createAction("app/isActive")(e));
    this.props.dispatch(createAction("search/isSearch")(false));
  }
}

const styles = StyleSheet.create({
  container: {
    height: Screen.s(155),
    flexDirection: "row",
    marginLeft: Screen.s(30),
    marginRight: Screen.s(30),
    alignItems: "center",
    justifyContent: "space-between"
  },
  totalOrderStyle: {
    width: Screen.s(85),
    height: Screen.s(85),
    borderRadius: Screen.s(42.5),
    borderWidth: Screen.s(1),
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center"
  },
  orderStyle: {
    width: Screen.s(350),
    height: Screen.s(155),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Header;
