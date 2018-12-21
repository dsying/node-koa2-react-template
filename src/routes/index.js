import AC from '../components/async_load'
//import 本质上是个promise
export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: AC(() => import('../views/home'))
  },
  {
    name: '详情页',
    icon: 'detail',
    path: '/detail',
    component: AC(() => import('../views/movie'))
  }
]