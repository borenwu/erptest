<template>
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img :src='loginUser.img' class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{loginUser.username}}</p>
          <!-- Status -->
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>

      <!-- search form (Optional) -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu">
        <li class="header">工具</li>
        <!-- Optionally, you can add icons to the links -->
        <li :style="styleHome">
          <router-link to="/home">
            <i class="fa fa-dashboard"></i>
            <span>主页</span>
          </router-link>
        </li>

        <li :style="styleOrder">
          <router-link to="/order">
            <i class="fa fa-folder"></i>
            <span>订单</span>
          </router-link>
        </li>

        <li class="treeview">
          <a href="#"><i class="fa fa-tasks"></i> <span>工作</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li>
              <router-link to="/task">任务</router-link>
            </li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#"><i class="fa fa-link"></i> <span>仓库</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#">Link in level 2</a></li>
            <li><a href="#">Link in level 2</a></li>
          </ul>
        </li>

        <li class="treeview" :style="styleFinance">
          <a href="#"><i class="fa fa-bar-chart"></i> <span>财务</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li>
              <router-link to="/sales">销售报告</router-link>
            </li>
          </ul>
        </li>

        <!--demo test link-->
        <li>
          <router-link to="/demotest">
            <i class="fa fa-folder"></i>
            <span>demotest</span>
          </router-link>
        </li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>

</template>

<style>
  .disabled {
    pointer-events: none;
  }
</style>

<script>
  import $ from 'jquery'
  export default{
    data(){
      return {
        msg: 'main sidebar',

        styleObj: {
          pointerEvents: 'none'
        },

      }
    },

    computed: {
      loginUser(){
        return this.$store.getters.getUser;
      },
      permision(){
        return this.$store.getters.getPermison;
      },
      styleHome() {
        let vm = this;
        return {pointerEvents: vm.permision.home[vm.loginUser.role]}
      },
      styleOrder() {
        let vm = this;
        return {pointerEvents: vm.permision.order[vm.loginUser.role]}
      },
      styleFinance() {
        let vm = this;
        return {pointerEvents: vm.permision.finance[vm.loginUser.role]}
      },

    },

    mounted(){
    }
  }
</script>
