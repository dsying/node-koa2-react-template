import AC from '../components/async_load'
//import 本质上是个promise
export default [
  {
    name: '后台入口页',
    icon: 'admin',
    path: '/auth',
    component: AC(() => import('../views/admin/login'))
  },
  {
    name: '后台管理页',
    icon: 'admin',
    path: '/admin',
    component: AC(() => import('../layout'))
  }
]