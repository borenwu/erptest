<template>
  <div>
    <!--<h1 class="text-center">订单</h1>-->
    <section class="content">
      <div class="row">
        <!--order form-->
        <div class="col-md-3">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">新建订单</h3>
            </div>

            <div class="box-body">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-group"></i></span>
                <input class="form-control" placeholder="客户" type="text" v-model="neworder.clientname">
              </div>
              <br/>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-keyboard-o"></i></span>
                <input class="form-control" placeholder="任务名称" type="text" v-model="neworder.taskname">
              </div>
              <br/>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-sort-numeric-asc"></i> 印刷量</span>
                <input class="form-control" placeholder=0 type="number" v-model="neworder.amount">
              </div>
              <br>

              <div class="form-group">
                <label>装订方式</label>
                <select class="form-control" v-model="neworder.bookbind">
                  <option>无</option>
                  <option>平钉</option>
                  <option>骑马钉</option>
                  <option>无线胶装</option>
                  <option>锁线胶装</option>
                  <option>精装</option>
                </select>
              </div>
              <br/>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-calendar"></i> 交付日期</span>
                <input type="text" style="width: 100%" class="datetime" id="newDueDate" v-model="neworder.duedate"/>
              </div>
              <br>

              <div class="form-group">
                <label>任务描述</label>
                <textarea class="form-control" rows="3" placeholder="请输入 ..." v-model="neworder.description"></textarea>
              </div>

              <button type="submit" class="btn bg-purple btn-flat pull-right" @click="handleAddOrder">
                <i class="fa fa-send-o"></i> 提交订单
              </button>
            </div>
          </div>
        </div>

        <!--nav tab-->
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#today" data-toggle="tab">今日订单</a></li>
              <li><a href="#search" data-toggle="tab">订单查询</a></li>
            </ul>
            <div class="tab-content">
              <div class="active tab-pane" id="today">

                <div class="post" v-for="(order,index) in orders">
                  <div class="user-block">
                    <img class="img-circle img-bordered-sm" src="../../../../static/img/client.png" alt="user image">
                    <span class="username">
                    <a href="#">{{order.clientname}}</a>
                  </span>
                    <span class="description">2017-05-02 7:30 PM</span>
                  </div>
                  <!-- /.user-block -->
                  <p>
                    任务名：{{order.taskname}}
                  </p>
                  <p>
                    印量：{{order.amount}}
                  </p>
                  <p>
                    装订方式：{{order.bookbind}}
                  </p>
                  <p>
                    交付日期：{{order.due_date}}
                  </p>
                  <p>
                    任务描述：{{order.description}}
                  </p>
                  <p v-if="order.status">
                    状态：已完成
                  </p>
                  <p v-else>
                    状态：未完成
                  </p>
                  <ul class="list-inline">
                    <li>
                      <a href="#" class="link-black" data-toggle="modal" data-target="#myModal"
                         @click="handleEdit(order,index)"><i class="fa fa-edit margin-r-5"></i> 修改</a>
                    </li>
                    <li>
                      <a href="#" class="link-black" @click="handleDeleteOrder(order,orders,index)"><i
                        class="fa fa-remove margin-r-5"></i> 删除</a>
                    </li>
                    <li>
                      <a href="#" class="link-black " @click="handleFinishOrder(order,orders,index)"><i class="fa fa-flag margin-r-5"></i> 完成</a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- /.tab-pane -->

              <div class="tab-pane" id="search">
                <!--search bar-->
                <div class="row">
                  <div class="col-md-3">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-calendar"></i> 起始日期</span>
                      <input type="text" style="width: 100%" class="datetime" id="startDate"/>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-calendar"></i> 终止日期</span>
                      <input type="text" style="width: 100%" class="datetime" id="endDate"/>
                    </div>
                  </div>

                  <button type="button" class="btn btn-info btn-flat btn-sm" @click="handleSearchOrder()">
                    <i class="fa  fa-search"></i>
                    检索
                  </button>
                  <br>
                  <br>
                  <hr>
                  <!--search table-->
                  <div class="col-md-12">
                    <div class="box box-danger">
                      <div class="box-header">
                        <h3 class="box-title">订单列表</h3>
                      </div>
                      <!-- /.box-header -->
                      <div class="box-body">
                        <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
                          <div class="row">
                            <div class="col-sm-12">
                              <div id="example1_length" class="dataTables_length">
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-12 table-responsive" id="demo">
                              <table id="example" class="table table-striped table-hover table-bordered">
                                <thead>
                                <tr role="row">
                                  <th>创建日期
                                  </th>
                                  <th>客户
                                  </th>
                                  <th>任务
                                  </th>
                                  <th>印刷量
                                  </th>
                                  <th>装订方式
                                  </th>
                                  <th>交付日期
                                  </th>
                                  <th>操作
                                  </th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr role="row" v-for="(searchOrder,index) in searchOrders">
                                  <td>{{searchOrder.order_date}}</td>
                                  <td>{{searchOrder.clientname}}</td>
                                  <td>{{searchOrder.taskname}}</td>
                                  <td>{{searchOrder.amount}}</td>
                                  <td>{{searchOrder.bookbind}}</td>
                                  <td>{{searchOrder.due_date}}</td>
                                  <td class="sorting_1">
                                    <div class="container-fluid">
                                      <div class="btn-group">
                                        <button class="btn btn-primary btn-sm"
                                                data-toggle="modal"
                                                data-target="#myModal"
                                                @click="handleDeleteOrder(searchOrder,index)">
                                          编辑
                                        </button>
                                        <button class="btn btn-danger btn-sm" @click="handleDeleteOrder(searchOrder,searchOrders,index)">删除</button>
                                        <button class="btn btn-success btn-sm" :disabled="searchOrder.status" @click="handleFinishOrder(searchOrder,searchOrders,index)">
                                          完成
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <!-- /.box-body -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.tab-pane -->

            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>


        <!--update editor-->
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Update Order</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="box box-info">
                      <div class="box-header with-border">
                        <h3 class="box-title">修改订单</h3>
                      </div>

                      <div class="box-body">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-group"></i></span>
                          <input class="form-control" type="text" v-model="currentorder.clientname">
                        </div>
                        <br/>

                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-keyboard-o"></i></span>
                          <input class="form-control" type="text" v-model="currentorder.taskname">
                        </div>
                        <br/>

                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-sort-numeric-asc"></i> 印刷量</span>
                          <input class="form-control" type="number" v-model="currentorder.amount">
                        </div>
                        <br>

                        <!-- select examples -->
                        <div class="form-group">
                          <label>装订方式</label>
                          <select class="form-control" v-model="currentorder.bookbind">
                            <option>无</option>
                            <option>平钉</option>
                            <option>骑马钉</option>
                            <option>无线胶装</option>
                            <option>锁线胶装</option>
                            <option>精装</option>
                          </select>
                        </div>
                        <br/>

                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-calendar"></i> 交付日期</span>
                          <input type="text" style="width: 100%" class="datetime" id="updateDuedate"
                                 v-model="currentorder.due_date"/>
                        </div>
                        <br>

                        <div class="form-group">
                          <label>任务描述</label>
                          <textarea class="form-control" rows="3" placeholder="请输入 ..."
                                    v-model="currentorder.description"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="handleUpdateOrder(currentorder)">保存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<style>

</style>

<script>
  import $ from 'jquery'



  export default{
    data(){
      return {
        msg: 'Welcome to Your Vue.js App',

        companyId:'',
        token:'',
        user:null,
        rootUrl:'',

        neworder: {
          clientname: "",
          taskname: "",
          amount: 0,
          duedate: "",
          bookbind: "",
          description: ""
        },

        currentorder: {},

        orders: [],
        searchOrders:[]
      }
    },

    computed:{
      loginUser(){
        return this.$store.getters.getUser;
      }
    },

    methods: {
      todayOrder(){
        let vm = this
        let today = new Date()
        let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
        $.ajax({
          type: 'post',
          url: vm.rootUrl + '/order/look',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            startDate: vm.formatDate(today),
            endDate: vm.formatDate(tomorrow)
          }
        }).done((resp) => {
          if (resp.results.length > 0) {
            vm.orders = resp.results
          }
          else {
            vm.orders = []
          }

        })
      },

      addOrder(clientname, taskname, amount, duedate, bookbind, description){
        let vm = this;
        $.ajax({
          type: 'post',
          url: vm.rootUrl + '/order/add',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            clientname: clientname,
            taskname: taskname,
            amount: amount,
            duedate: duedate,
            bookbind: bookbind,
            description: description
          }
        }).done((resp) => {
          if (resp.status == "success") {
            vm.todayOrder()
          }
        })
      },

      searchOrder(startDate, endDate){
        let vm = this
        let end = new Date(endDate)
        let searchEnd = new Date(end.getTime() + 24 * 60 * 60 * 1000)
        $.ajax({
          type: 'post',
          url: vm.rootUrl + '/order/look',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            startDate: startDate,
            endDate: vm.formatDate(searchEnd)
          }
        }).done(function (resp) {
          if (resp.results.length > 0) {
            vm.searchOrders = resp.results
          }
          else {
            vm.searchOrders = []
          }
        })
      },

      deleteOrder(id, sn, orders,index){
        let vm = this;
        $.ajax({
          type: 'post',
          url: vm.rootUrl + '/order/delete',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            id: id,
            sn: sn,
          }
        }).done((resp) => {
          if (resp.status == "success") {
            orders.splice(index, 1);
          }
        })
      },

      updateOrder(id, sn, clientname, taskname, amount, bookbind, description, duedate, index){
        let vm = this;
        $.ajax({
          type: 'post',
          url: vm.rootUrl + '/order/update',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            id: id,
            sn: sn,
            clientname: clientname,
            taskname: taskname,
            amount: amount,
            bookbind: bookbind,
            description: description,
            duedate: duedate
          }
        }).done((resp) => {
          if (resp.status == "success") {
            alert('success')
            let order = vm.orders[index]
            order.clientname = clientname
            order.taskname = taskname
            order.amount = amount
            order.bookbind = bookbind
            order.description = description
            order.due_date = duedate
          }
        })
      },

      finishOrder(id, sn,orders,index){
        var vm = this;
        $.ajax({
          type: 'post',
          url: vm.rootUrl+'/order/finish',
          data: {
            company_id: vm.companyId,
            token: vm.token,
            id: id,
            sn: sn,
            finish_by : vm.loginUser.username
          }
        }).done((resp) => {
          if (resp.status == "success") {
            alert('finish')
            let order = orders[index]
            order.status = true
          }
        })
      },

      handleAddOrder(e){
        e.preventDefault();
        let vm = this
        vm.addOrder(vm.neworder.clientname, vm.neworder.taskname, vm.neworder.amount, vm.neworder.duedate, vm.neworder.bookbind, vm.neworder.description)
      },

      handleDeleteOrder(order, orders,index){
        let vm = this
        vm.deleteOrder(order.id, order.SN, orders,index)
      },

      handleUpdateOrder(currentorder){
        let vm = this;
        vm.updateOrder(currentorder.id, currentorder.SN,
          currentorder.clientname, currentorder.taskname,
          currentorder.amount, currentorder.bookbind,
          currentorder.description, currentorder.due_date, currentorder.index)
      },

      handleEdit(order, index) {
        let vm = this
        vm.currentorder = order;
        vm.currentorder.index = index;
      },

      handleSearchOrder(){
        let vm = this
        let startDate = $('#startDate').val()
        let endDate = $('#endDate').val()
        vm.searchOrder(startDate, endDate)
      },

      handleFinishOrder(order,orders,index){
        let vm = this;
        vm.finishOrder(order.id, order.SN,orders,index)
      },

      formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
      },
    },
    mounted(){
      const vm = this;

      console.log('user: '+vm.loginUser.username)

      let company = this.$store.state.company
      vm.companyId = company.companyId
      vm.token = company.token
      vm.rootUrl = this.$store.state.rootUrl

      vm.todayOrder()

      $('.datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', (ev) => {
        let id = ev.delegateTarget.id
        if (id == 'newDueDate') {
          vm.neworder.duedate = $('#newDueDate').val()
        }
        if (id == 'updateDuedate') {
          vm.currentorder.due_date = $('#updateDuedate').val()
        }
      });
    }
  }
</script>
