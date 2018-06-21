/**
 * Created by chintec on 2018/3/22.
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TextInput, Image, TouchableOpacity,ScrollView,FlatList } from 'react-native'
import { connect } from 'react-redux'
import { createAction, NavigationActions,Storage } from '../utils'
import Screen from '../common/ScreenUtil'
import HistoryListItem from './HistoryListItem'
@connect(({ app, search }) => ({ ...app, ...search }))
class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listArr: this.props.searchData,
    }
  }

  componentWillMount(){

  }
  componentWillReceiveProps(nextProps){
    this.setState({
      listArr: nextProps.searchData
    })
  }

  render() {
    let List = this.state.listArr.length>0 && this.state.listArr.map((v,i) => {
      return(
        <View key={i}>
          <View style={{width:Screen.s(640),}}>
            <HistoryListItem  item={v} index={i} key={i} lookDetail={this.props.lookDetail} showToast={this.props.showToast}/>
          </View>
        </View>
      )
    })
    return (
      <View style={styles.container}>
        {List}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width:Screen.s(1920),
  },
})

export default Search
