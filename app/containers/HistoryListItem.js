/**
 * Created by chintec on 2018/3/23.
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TextInput, Image, TouchableOpacity,ScrollView,FlatList } from 'react-native'
import { connect } from 'react-redux'
import Screen from '../common/ScreenUtil'
@connect(({ app }) => ({ ...app }))
class HistoryListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount(){

  }

  render() {
    let {item,index} = this.props
    return (
      <View style={styles.itemDetailStyle}>
        <Text style={{fontSize:Screen.t(50), color:'#FFBF34'}}>{item.orderNumber}</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={{width:Screen.s(110),height:Screen.s(50),alignItems:'center',justifyContent:'center',borderWidth:Screen.s(1),borderColor:'#979797'}}
            onPress={this.openDetail.bind(this,item)}
          >
            <Text style={{fontSize:Screen.t(30), color:'#979797'}}>详情</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft:Screen.s(32),width:Screen.s(110),height:Screen.s(50),alignItems:'center',justifyContent:'center',borderWidth:Screen.s(1),borderColor:'#FFBF34'}}
            onPress={this.callOrder.bind(this)}
          >
            <Text style={{fontSize:Screen.t(30), color:'#FFBF34'}}>叫号</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }

  callOrder(){
    //console.log(this.props)
    this.props.showToast('叫号成功')
  }

  openDetail(item){
    this.props.lookDetail(item)
  }

}
const styles = StyleSheet.create({
  container: {
    width:Screen.s(1920),
    flexDirection:'row'
  },
  itemDetailStyle:{
    height:Screen.s(93),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft:Screen.s(29),
    marginRight:Screen.s(29),
    borderBottomWidth:Screen.s(1),
    borderColor:'#D5D4D4'
  }
})

export default HistoryListItem
