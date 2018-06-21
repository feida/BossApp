import React from 'react'
import { AppRegistry, View, StatusBar } from 'react-native'

import dva from './utils/dva'
import Router, { routerMiddleware } from './router'

import appModel from './models/app'
import routerModel from './models/router'
import searchModel from './models/search'

console.ignoredYellowBox = [
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]

const app = dva({
  initialState: {},
  models: [appModel, routerModel, searchModel],
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(
  <View style={{flex:1}}>
    {/*<StatusBar
      //translucent={true}
      backgroundColor="#000"
      barStyle="#fff"
    />*/}
    <Router />
  </View>

)

export default App
//AppRegistry.registerComponent('DvaStarter', () => App)
