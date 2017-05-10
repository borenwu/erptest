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

  permision:null,
  company:null,
  rootUrl:""
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
  SET_PERMISION (state, permision) {
    state.permision = permision
  },
}

const actions = {

}

const getters = {
  getUser(state){
    return state.user;
  },
  getPermison(state){
    return state.permision
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
