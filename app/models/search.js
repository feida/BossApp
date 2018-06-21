import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'search',
  state: {
    isSearch: false,
    searchData:[]
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *isSearch({ payload }, { call, put }) {
      yield put({type:'updateState',payload:{ isSearch: payload}})
    },
    *upDateSearchData({ payload }, { call, put }) {
      yield put({type:'updateState',payload:{ searchData: payload}})
    },
  },
  subscriptions: {

  },
}
