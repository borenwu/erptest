<template>
  <div>
    <header class="main-header">
      <!-- Logo -->
      <a href="index2.html" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>A</b>LT</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Admin</b>LTE</span>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <!-- Menu Toggle Button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img :src='loginUser.img' class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">{{loginUser.username}}</span>
              </a>

              <!--dropdown-->
              <ul class="dropdown-menu">
                <!-- The user image in the menu -->
                <li class="user-header">
                  <img :src='loginUser.img' class="img-circle" alt="User Image">

                  <p>
                    权限级别： {{loginUser.role}}
                  </p>
                </li>
                <!-- Menu Body -->
                <!--<li class="user-body">-->
                <!--<div class="row">-->
                <!--<div class="col-xs-4 text-center">-->
                <!--<a href="#">Followers</a>-->
                <!--</div>-->
                <!--<div class="col-xs-4 text-center">-->
                <!--<a href="#">Sales</a>-->
                <!--</div>-->
                <!--<div class="col-xs-4 text-center">-->
                <!--<a href="#">Friends</a>-->
                <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash; /.row &ndash;&gt;-->
                <!--</li>-->
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <a href="#" class="btn btn-default btn-flat">个人资料</a>
                  </div>
                  <div class="pull-right" v-if="loginUser.buttonLabel == '登录'">
                    <button class="btn btn-default btn-flat"
                            data-toggle="modal"
                            data-target="#loginModal">
                      {{loginUser.buttonLabel}}
                    </button>
                  </div>
                  <div class="pull-right" v-else>
                    <button class="btn btn-default btn-flat" @click="handleClick1()">{{loginUser.buttonLabel}}</button>
                  </div>
                </li>
              </ul>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Modal -->
    <div class="modal fade" id="loginModal" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">用户登陆</h4>
          </div>
          <div class="modal-body">
            <div class="login-box">
              <div class="login-logo">
                <a><b>印务</b>通</a>
              </div>
              <!-- /.login-logo -->
              <div class="login-box-body">
                <p class="login-box-msg">登陆</p>

                <form>
                  <div class="form-group has-feedback">
                    <input type="text" class="form-control" placeholder="用户名" v-model="username">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  </div>
                  <div class="form-group has-feedback">
                    <input type="password" class="form-control" placeholder="密码" v-model="password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                  </div>
                  <div class="row">
                    <div class="col-xs-8">
                      <div class="checkbox icheck">
                        <label>
                          <input type="checkbox"> 记住我
                        </label>
                      </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-xs-4">
                      <button class="btn btn-primary btn-block btn-flat" @click="handleLogin">登陆</button>
                    </div>
                    <!-- /.col -->
                  </div>
                </form>
              </div>
              <!-- /.login-box-body -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>


</style>

<script>
  import $ from 'jquery'
  export default{
    data(){
      return {
        msg: 'main header',

        companyId: '',
        token: '',
        user: null,
        rootUrl: '',

        username: '',
        password: ''
      }
    },

    computed:{
        loginUser(){
          return this.$store.getters.getUser;
        }
    },

    methods: {
      checkLogin(){
        let vm = this
        let user = this.$store.state.user
        if (user.username == '') {
          console.log('no user')
          vm.loginUser.username = '未登录'
          vm.loginUser.role = '请登录'
          vm.loginUser.buttonLabel = '登录'
        }
        else {
          console.log('user exist')
          vm.loginUser.img = 'static/img/userloged.png'
          vm.loginUser.username = this.$store.state.user.username
          vm.loginUser.role = this.$store.state.user.role
          vm.loginUser.buttonLabel = '登出'
        }
      },

      login(){
        let vm = this;
        $.ajax({
          type: 'post',
          url: vm.rootUrl + '/user/login',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            username: vm.username,
            password: vm.password,
          }
        }).done((resp) => {
          if (resp.status == "success") {
            let store = this.$store
            let userInfo = {
              img : 'static/img/userloged.png',
              username: resp.result.username,
              password: resp.result.password,
              role: resp.result.role,
              company_name: resp.result.company_name,
              buttonLabel : '登出'
            }
            store.commit('SET_USER', userInfo)
          }
        })
      },

      handleLogin(e){
        let vm = this;
        vm.login()
        e.preventDefault();
        $('#loginModal').modal('hide')
      },

      handleClick1(){
        console.log('deng chu')
      }
    },

    mounted(){
      const vm = this;

      let company = this.$store.state.company
      vm.companyId = company.companyId
      vm.token = company.token
      vm.rootUrl = this.$store.state.rootUrl

      this.checkLogin()
    },
  }
</script>
