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
import { createAction, NavigationActions, Storage } from "../utils";
import Detail from "./Detail";
@connect(({ app }) => ({ ...app }))
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyArr: []
    };
  }
  async storageHistory() {
    let historyArr = await Storage.get("historySearch");
    let temp = [];
    if (historyArr && historyArr.length > 0) {
      for (let i = 0, len = historyArr.length; i < len; i += 30) {
        temp.push(historyArr.slice(i, i + 30));
      }
    }
    this.setState({
      historyArr: temp
    });
  }
  componentWillMount() {
    this.storageHistory();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref="contentScrollView"
          horizontal={true}
          pagingEnabled={true}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          //onMomentumScrollEnd= {this.onMomentumScrollEnd.bind(this)}
          //onScroll={this.onScroll.bind(this)}
        >
          <FlatList
            data={this.state.historyArr}
            keyExtractor={this._keyExtractor}
            horizontal={true}
            renderItem={({ item, index }) => (
              <Detail
                Item={item}
                Index={index}
                num={this.state.historyArr.length}
                lookDetail={this.props.lookDetail}
                showToast={this.props.showToast}
              />
            )}
          />
        </ScrollView>
      </View>
    );
  }
  _keyExtractor = (item, index) => index.toString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default History;
