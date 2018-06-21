import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  PixelRatio,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { createAction, NavigationActions, Storage } from "../utils";
import Orientation from "react-native-orientation";
import SplashScreen from "react-native-splash-screen";
import Screen from "../common/ScreenUtil";
import Header from "./Header";
import ActiveDetail from "./ActiveDetail";
import HistoryDetail from "./HistoryDetail";
import SearchDetail from "./SearchDetail";
import Modal from "react-native-modal";
import Toast, { DURATION } from "react-native-easy-toast";
import ReconnectingWebSocket from 'reconnecting-websocket';

let itemH = Screen.s(54);
let { height, width } = Dimensions.get("window");
@connect(({ app, search }) => ({ ...app, ...search }))
class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      modalData: [],
      touchIndex: "",
      historyArr: [],
      totalOrder: this.props.data.length
    };
  }
  componentWillMount() {
    // 判断横竖屏幕
    var initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      //do stuff
    } else {
      //do other stuff
    }
    Orientation.lockToLandscapeLeft();
    this.clearHistory();
    this.storageHistory();
  }

  async storageHistory() {
    let historyArr = await Storage.get("historySearch");
    this.setState({
      historyArr: historyArr ? historyArr : []
    });
  }

  async clearHistory() {
    let nowDate = Screen.toDate(new Date(), "yyyy-MM-dd");
    //console.log('时间', nowDate)
    let date = await Storage.get("historyDate");
    if (date && date !== nowDate) {
      Storage.remove("historySearch");
    }
    Storage.set("historyDate", nowDate);
  }
  componentDidMount() {
    SplashScreen.hide();
    this.aa();
    //this.bb();
  }
  aa(){
    //const rws = new ReconnectingWebSocket('ws://10.0.2.2:8080','echo-protocol');
    const rws = new ReconnectingWebSocket('ws://10.0.2.2:3050');

    rws.addEventListener('open', () => {
      console.log('喔喔喔喔喔喔喔喔我玩');
      rws.send('hello!');
    });
    rws.onopen = function (event) {
      console.log("onopen");
      //rws.send('hello!');
    };
    console.log('喔喔喔喔喔喔喔喔我玩',rws);

    rws.onmessage = (e) => {
      // 接收到了一个消息
      console.log('你你你你你你你你你你你你',e.data);
    };
    rws.onclose = (e) => {
      console.log('ffffffffafafafafafa',e);
      // 连接被关闭了
      console.log(e.code, e.reason);
    };
  }
  bb() {
    var ws = new WebSocket('ws://10.0.2.2:8080','echo-protocol');
    //var ws = new WebSocket('ws://192.168.1.141:8080');
    ws.onopen = () => {
      // 打开一个连接
      console.log('喔喔喔喔喔喔喔喔我玩');
      ws.send('something'); // 发送一个消息
    };

    ws.onmessage = (e) => {
      // 接收到了一个消息
      console.log('返回',e.data);
      //console.log(e.data);
    };

    ws.onerror = (e) => {
      // 发生了一个错误
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log('ffffffffafafafafafa',e);
      // 连接被关闭了
      console.log(e.code, e.reason);
    };
    console.log('你你你你你你你你你你你你',ws);
  }
  render() {
    let cuisineList = null;
    let totalCuisine = 0;
    if (this.state.modalData.cuisine) {
      let arr = [].concat(this.state.modalData.cuisine);
      cuisineList = arr.map((v, i) => {
        if (v.comboChild.length > 0) {
          totalCuisine += v.comboChild.length * v.count;
        } else {
          totalCuisine += v.count;
        }
        return (
          <View style={{}} key={i}>
            <View style={styles.comboStyle}>
              <Text style={styles.comboName}>{v.name}</Text>
              <Text style={[styles.comboName, { marginRight: Screen.s(36) }]}>
                x{v.count}
              </Text>
            </View>
            {v.comboChild.length > 0 &&
              v.comboChild.map((l, h) => {
                return (
                  <View style={styles.comboChildStyle} key={h}>
                    <View style={styles.dot} />
                    <Text style={{ fontSize: Screen.t(26), color: "#999" }}>
                      {l.name}
                    </Text>
                  </View>
                );
              })}
          </View>
        );
      });
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={false} backgroundColor="#000" barStyle="light-content"/>
        <Header totalOrder={this.state.totalOrder} />
        <View
          style={{
            width: Screen.s(1920),
            height: Screen.s(8),
            backgroundColor: "#D8D8D8"
          }}
        />
        {this.props.active && (
          <ActiveDetail
            ref={comp => (this.activeDetail = comp)}
            lookDetail={this.showModal.bind(this)}
            upDateTotalOrder={this.upDateTotalOrder.bind(this)}
          />
        )}
        {!this.props.active &&
          !this.props.isSearch && (
            <HistoryDetail
              lookDetail={this.showHistoryModal.bind(this)}
              showToast={this.showToast.bind(this)}
            />
          )}
        {!this.props.active &&
          this.props.isSearch && (
            <SearchDetail
              lookDetail={this.showHistoryModal.bind(this)}
              showToast={this.showToast.bind(this)}
            />
          )}
        <Modal
          style={{ margin: 0 }}
          isVisible={this.state.isModalVisible}
          onBackdropPress={this._toggleModal}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: Screen.s(470),
                height: Screen.s(965),
                backgroundColor: "#fff",
                position: "absolute",
                right: 0,
                top: this.props.active ? Screen.s(193) : Screen.s(163),
                padding: Screen.s(10.5)
              }}
            >
              <View
                style={{
                  height: itemH,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.totalOrderStyle}>
                  <Text style={{ fontSize: Screen.t(30), color: "#FFBF34" }}>
                    {totalCuisine}
                  </Text>
                </View>
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
                    {this.state.modalData.time}min
                  </Text>
                </View>
                <Text style={{ fontSize: Screen.t(48), color: "#FFBF34" }}>
                  {this.state.modalData.orderNumber}
                </Text>
              </View>
              <View style={{ width: Screen.s(470), height: Screen.s(54) * 15 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {cuisineList}
                </ScrollView>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={this.callOrder.bind(this)}
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
          </View>
        </Modal>
        <Toast
          ref="toast"
          style={{
            backgroundColor: "#4A4A4A",
            width: Screen.s(1920),
            height: Screen.s(68),
            borderRadius: 0,
            padding: 0,
            alignItems: "center",
            justifyContent: "center"
          }}
          position="bottom"
          positionValue={60}
          fadeInDuration={300}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff", fontSize: Screen.t(32) }}
        />
      </View>
    );
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  showModal(m, i) {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      modalData: m,
      touchIndex: i
    });
  }

  callOrder() {
    if (this.props.active) {
      let data = this.props.data;
      data.splice(7 - this.state.touchIndex, 1);
      this.props.dispatch(createAction("app/upDateData")(data));
      let tempData = this.state.historyArr;
      tempData.unshift(this.state.modalData);
      Storage.set("historySearch", tempData);

      this.upDateTotalOrder(data.length);
    } else {
      this.showToast("叫号成功");
    }
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  }
  showHistoryModal(m) {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      modalData: m
    });
  }

  upDateTotalOrder(num) {
    this.setState({
      totalOrder: num
    });
  }

  showToast(text) {
    this.refs.toast.show(text);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  comboStyle: {
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
  totalOrderStyle: {
    width: Screen.s(40),
    height: Screen.s(40),
    borderRadius: Screen.s(20),
    borderWidth: Screen.s(1),
    borderColor: "#FFBF34",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Home;
