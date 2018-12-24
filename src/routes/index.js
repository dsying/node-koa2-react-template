import AC from '../components/async_load'
//import 本质上是个promise
export default [
  {
    name: '首页',
    icon: 'home',
    path: '/type',
    component: AC(() => import('../views/home'))
  },
  {
    name: '详情页',
    icon: 'detail',
    path: '/detail ',
    component: AC(() => import('../views/movie'))
  },
  {
    name: '后台入口页',
    icon: 'admin',
    path: '/admin',
    component: AC(() => import('../views/admin/login'))
  },
  {
    name: '后台管理页',
    icon: 'admin',
    path: '/admin/index',
    component: AC(() => import('../layout'))
  }
]