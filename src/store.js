/**
 * Created by Administrator on 2017/3/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null,
  company:null,
  rootUrl:""
  // userInfo: {
  //   messages: [{1: 'test', 2: 'test'}],
  //   notifications: [],
  //   tasks: []
  // }
}


const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_COMPANY (state, company) {
    state.company = company
  },
  SET_URL (state, rootUrl) {
    state.rootUrl = rootUrl
  },
}

export default new Vuex.Store({
  state,
  mutations
})
