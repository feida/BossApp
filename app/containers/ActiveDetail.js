import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { createAction, NavigationActions, Storage } from "../utils";
import Screen from "../common/ScreenUtil";
let { height, width } = Dimensions.get("window");
let itemH = Screen.s(54);
@connect(({ app }) => ({ ...app }))
class ActiveDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: [],
      historyArr: []
    };
  }
  initData(data) {
    if (data.length >= 8) {
      this.setState({
        activeData: data.slice(0, 8).reverse()
      });
    } else {
      let arr = [];
      if (data.length > 0) {
        //console.log('this.length',data.length)
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
      }
      let len = 8 - data.length;
      for (let i = 0; i < len; i++) {
        arr.push({});
      }
      this.setState({
        activeData: arr.reverse()
      });
      //this.state.activeData = arr.reverse()
    }
  }
  async storageHistory() {
    let historyArr = await Storage.get("historySearch");
    this.setState({
      historyArr: historyArr ? historyArr : []
    });
  }
  componentWillMount() {
    this.initData(this.props.data);
    this.storageHistory();
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    this.initData(nextProps.data);
  }
  render() {
    //console.log(this.state.activeData)
    let item =
      this.state.activeData &&
      this.state.activeData.map((v, i) => {
        //let count = 0
        //let totalCuisine = 0
        let count = v.cuisine && v.cuisine.length;
        if (v.cuisine) {
          for (let j = 0; j < v.cuisine.length; j++) {
            count += v.cuisine[j].comboChild.length;
          }
        }
        let num = 0;
        let cuisineList =
          v.cuisine &&
          v.cuisine.map((m, k) => {
            num++;
            if (count < 7) {
              return (
                <View style={{}} key={k}>
                  <View style={styles.comboStyle}>
                    <Text style={styles.comboName}>{m.name}</Text>
                    <Text style={styles.comboName}>x{m.count}</Text>
                  </View>
                  {m.comboChild.length > 0 &&
                    m.comboChild.map((l, h) => {
                      return (
                        <View style={styles.comboChildStyle} key={h}>
                          <View style={styles.dot} />
                          <Text
                            style={{ fontSize: Screen.t(26), color: "#999" }}
                          >
                            {l.name}
                          </Text>
                        </View>
                      );
                    })}
                </View>
              );
            } else {
              if (num == 6) {
                return (
                  <View
                    key={k}
                    style={{ height: itemH, justifyContent: "center" }}
                  >
                    <Text style={styles.more}>>>> 更多餐品</Text>
                  </View>
                );
              }
              if (num < 7) {
                return (
                  <View style={{}} key={k}>
                    <View style={styles.comboStyle}>
                      <Text style={styles.comboName}>{m.name}</Text>
                      <Text style={styles.comboName}>x{m.count}</Text>
                    </View>
                    {m.comboChild.length > 0 &&
                      m.comboChild.map((l, h) => {
                        num++;
                        if (num == 6) {
                          return (
                            <View
                              key={k}
                              style={{
                                height: itemH,
                                justifyContent: "center"
                              }}
                            >
                              <Text style={styles.more}>>>> 更多餐品</Text>
                            </View>
                          );
                        }
                        if (num < 7) {
                          return (
                            <View style={styles.comboChildStyle} key={h}>
                              <View style={styles.dot} />
                              <Text
                                style={{
                                  fontSize: Screen.t(26),
                                  color: "#999"
                                }}
                              >
                                {l.name}
                              </Text>
                            </View>
                          );
                        }
                      })}
                  </View>
                );
              }
            }
          });

        if (v.orderNumber) {
          return (
            <View style={styles.itemContainer} key={i}>
              <View
                style={{
                  height: itemH,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontSize: Screen.t(28), color: "#000" }}>
                  No.{8 - i}
                </Text>
                <View
                  style={{
                    height: itemH,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    source={require("../images/time.png")}
                    style={{
                      width: Screen.s(27),
                      height: Screen.s(27),
                      marginRight: Screen.s(9)
                    }}
                  />
                  <Text style={{ fontSize: Screen.t(24), color: "#000006" }}>
                    {v.time}min
                  </Text>
                </View>
                <Text style={{ fontSize: Screen.t(48), color: "#FFBF34" }}>
                  {v.orderNumber}
                </Text>
              </View>
              <TouchableOpacity
                style={{ width: Screen.s(418), height: Screen.s(54) * 6 }}
                activeOpacity={1}
                onPress={() => {
                  count > 6 && this.lookDetail(v, i);
                }}
              >
                {cuisineList}
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={this.callOrder.bind(this, v, i)}
                  style={{
                    width: Screen.s(399),
                    height: Screen.s(66),
                    backgroundColor: "#FFBF34",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: Screen.s(5)
                  }}
                >
                  <Text style={{ fontSize: Screen.t(28), color: "#fff" }}>
                    叫号取餐
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        } else {
          return (
            <View style={styles.itemContainer} key={i}>
              <View
                style={{
                  alignItems: "center",
                  height: itemH * 7,
                  paddingTop: Screen.s(30)
                }}
              >
                <Image
                  source={require("../images/no_order.png")}
                  style={{ width: Screen.s(364), height: Screen.s(281) }}
                />
                <View
                  style={{
                    height: Screen.s(26),
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ fontSize: Screen.t(24), color: "#B6B6B6" }}>
                    暂无订单
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: Screen.s(399),
                    height: Screen.s(66),
                    backgroundColor: "#E6E6E6",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: Screen.s(5)
                  }}
                >
                  <Text style={{ fontSize: Screen.t(28), color: "#fff" }}>
                    叫号取餐
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      });
    return <View style={styles.container}>{item}</View>;
  }

  lookDetail(v, i) {
    this.props.lookDetail(v, i);
  }

  callOrder(v, i) {
    let data = this.props.data;
    data.splice(7 - i, 1);
    this.initData(data);
    this.props.dispatch(createAction("app/upDateData")(data));
    let tempData = this.state.historyArr;
    tempData.unshift(v);
    Storage.set("historySearch", tempData);

    this.props.upDateTotalOrder(data.length);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: Screen.s(14),
    paddingRight: Screen.s(14),

    flexDirection: "row",
    flexWrap: "wrap"
  },
  itemContainer: {
    width: Screen.s(442),
    height: Screen.s(467),
    borderWidth: Screen.s(1),
    borderColor: "#999",
    padding: Screen.s(10.5),
    //borderRadius:Screen.s(2),

    marginLeft: Screen.s((1920 - 445 * 4 - 28) / 8),
    marginRight: Screen.s((1920 - 445 * 4 - 28) / 8),
    marginTop: Screen.s(30)
  },
  comboStyle: {
    width: Screen.s(418),
    height: itemH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  comboName: {
    fontSize: Screen.t(30),
    color: "#000"
  },
  comboChildStyle: {
    height: itemH,
    flexDirection: "row",
    alignItems: "center"
  },
  dot: {
    width: Screen.s(8),
    height: Screen.s(8),
    borderRadius: Screen.s(4),
    backgroundColor: "#333",
    marginRight: Screen.s(8)
  },
  more: {
    fontSize: Screen.t(20),
    color: "#D81E06"
  }
});

export default ActiveDetail;
