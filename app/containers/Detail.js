/**
 * Created by chintec on 2018/3/22.
 */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import Screen from "../common/ScreenUtil";
import HistoryListItem from "./HistoryListItem";
import { createAction, NavigationActions, Storage } from "../utils";
@connect(({ app }) => ({ ...app }))
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: []
    };
  }
  componentWillMount() {
    let { Item } = this.props;
    let temp = [];
    if (Item && Item.length > 0) {
      for (let i = 0, len = Item.length; i < len; i += 10) {
        temp.push(Item.slice(i, i + 10));
      }
    }
    this.setState({
      itemData: temp
    });
  }

  render() {
    let { Item, Index, num } = this.props;
    let List = this.state.itemData.map((v, i) => {
      return (
        <View key={i}>
          <View
            style={{
              width: Screen.s(640),
              height: Screen.s(940),
              borderRightWidth: Screen.s(1),
              borderColor: "#979797"
            }}
          >
            {v.map((m, k) => {
              return (
                <HistoryListItem
                  item={m}
                  index={k}
                  key={k}
                  lookDetail={this.props.lookDetail}
                  showToast={this.props.showToast}
                />
              );
            })}
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              height: Screen.s(34)
            }}
          >
            <Text style={{ fontSize: Screen.t(24), color: "#D81E06" }}>
              {v.length + Index * 30 + i * 10}
            </Text>
          </View>
        </View>
      );
    });
    return (
      <View>
        <View style={styles.container}>{List}</View>
        <View
          style={{
            alignItems: "flex-end",
            height: Screen.s(42),
            marginRight: Screen.s(29)
          }}
        >
          <Text style={{ fontSize: Screen.t(26), color: "#FFBF34" }}>
            页码： {Index + 1}/{num}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Screen.s(1920),
    flexDirection: "row"
  },
  itemDetailStyle: {
    height: Screen.s(93),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: Screen.s(29),
    marginRight: Screen.s(29),
    borderBottomWidth: Screen.s(1),
    borderColor: "#D5D4D4"
  }
});

export default Detail;
