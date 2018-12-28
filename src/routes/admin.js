import AC from '../components/async_load'
//import 本质上是个promise
export default [
  {
    path: '/admin/type',
    exact: true,
    component: AC(() => import('../views/home'))
  },
  {
    path: '/admin/detail',
    exact: true,
    component: AC(() => import('../views/movie'))
  }
]