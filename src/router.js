// router
import Vue from 'vue'

import VueRouter from 'vue-router'
import Home from './components/home.vue'
import App from './App'
import index from './index'

import attendance from './components/attendance.vue'
import leave_record from './components/leave_record.vue'
import overtime_petitioner from './components/overtime_petitioner.vue'
import overtime_record from './components/overtime_record.vue'
import overtime_pass from './components/overtime_pass.vue'
import import_data from './components/import_data.vue'
import store from './store/index'
import Hello from './components/Hello.vue'
import Table from './components/table.vue'
import Letter from './components/station-letter.vue'
import Want from './components/product-want.vue'
import Dialog from './components/sh-dialog.vue'
import bottomMoney from './components/bottom-money.vue'
import dhbCheck from './components/dhb/dhb-check-list.vue'
import checkTwo from './components/dhb/dhb-check-detail.vue'
import crossTable from './components/table/crossTable.vue'
import dragTable from './components/table/dragTable.vue'
import moveTable from './components/table/moveTable.vue'

//import ElementUI from 'element-ui'
//import '!style!css!element-ui/lib/theme-default/index.css'
//
//Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  { path: '/',name:"home",component: Home},
  { path: '/attendance',component: attendance},
  { path: '/leave_record',component: leave_record},
  { path: '/overtime_pass',component: overtime_pass},
  { path: '/overtime_record',component: overtime_record},
  { path: '/overtime_petitioner',component: overtime_petitioner},
  { path: '/import_data',component: import_data},
  { path: '/table',component: Table},
  { path: '/letter',component: Letter},
  { path: '/productWant',component: Want},
  { path: '/sh_dialog',component: Dialog},
  { path: '/bottom_money',component: bottomMoney},
  { path: '/cross_table',component: crossTable},
  { path: '/drag_table',component: dragTable},
  { path: '/move_table',component: moveTable},
{ 
	path: '/dhb-check-list',
	component: dhbCheck,
   	children:[
		{
			name: 'check-detail',
			path:"dhb-check-detail",
			component:checkTwo
		},
		{
			name: 'table',
			path:"table",
			component:Table
		}
	]
},

//{ path: '/dhb-check-detail',component: checkTwo},
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  store,
  router,
  render: h => h(index)
}).$mount('#app')
// 路由跳转


// 现在，应用已经启动了！