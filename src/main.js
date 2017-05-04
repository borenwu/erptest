// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import store from './store'

import 'jquery/dist/jquery.min'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../static/js/app.min'

import '../static/js/plugins/datetimepicker/bootstrap-datetimepicker.min.css'
import '../static/js/plugins/datetimepicker/bootstrap-datetimepicker.min'
import '../static/js/plugins/datetimepicker/bootstrap-datetimepicker.zh-CN'

import '../static/js/plugins/datatables/jquery.dataTables'
// import '../static/js/plugins/datatables/jquery.dataTables.min.css'
import '../static/js/plugins/datatables/dataTables.bootstrap'
import '../static/js/plugins/datatables/dataTables.bootstrap.css'


Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})

