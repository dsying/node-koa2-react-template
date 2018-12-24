import AC from '../components/async_load'
//import 本质上是个promise
export default [
  {
    name: '首页',
    icon: 'home',
    path: '/admin/type',
    component: AC(() => import('../views/home'))
  },
  {
    name: '详情页',
    icon: 'detail',
    path: '/admin/detail ',
    component: AC(() => import('../views/movie'))
  }
]