/**
 * Created by Administrator on 2017/3/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    img: 'static/img/nouser.png',
    username: '',
    role: '',
    buttonLabel: '',
    password:'',
    company_name:''
  },
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

const actions = {

}

const getters = {
  getUser(state){
    return state.user;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
