import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'
import data from '../common/data'
let dataStr = JSON.stringify(data);
let a = JSON.parse(dataStr);
export default {
  namespace: 'app',
  state: {
    active: true,
    data:a
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *isActive({ payload }, { call, put }) {
      yield put({type:'updateState',payload:{ active: payload}})
    },
    *upDateData({ payload }, { call, put }) {
      yield put({type:'updateState',payload:{ data: payload}})
    },
  },
  subscriptions: {

  },
}
