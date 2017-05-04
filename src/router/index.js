import DemoTest from '@/components/routeviews/demotest/DemoTest.vue'
import SalesView from '@/components/routeviews/finance/SalesView.vue'
import HomeView from '@/components/routeviews/home/HomeView.vue'
import OrderView from '@/components/routeviews/order/OrderView.vue'
import WarehouseView from '@/components/routeviews/warehouse/WarehouseView.vue'
import TaskView from '@/components/routeviews/work/TaskView.vue'

const routes = [
  {
    path: '/order',
    name: 'OrderView',
    component: OrderView
  },
  {
    path: '/task',
    name: 'TaskView',
    component: TaskView
  },
  {
    path: '/warehouse',
    name: 'WarehouseView',
    component: WarehouseView
  },
  {
    path: '/sales',
    name: 'SalesView',
    component: SalesView
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/demotest',
    name: 'demotest',
    component: DemoTest
  },
]

export default routes
