const Router = require('koa-router')
const { resolve } = require('path')
const _ = require('lodash')  
const glob = require('glob')

const prefixSymbol = Symbol('prefix')
const routerMap = new Map()

const isArray = c => _.isArray(c) ? c : [c]


export class Route{
  constructor(app, apiPath){
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init(){
    //加载 controller 内的所有路由，意在 将所有装饰器 收集到 routerMap中
    const routes = glob.sync(resolve(this.apiPath, '**/*.js'))
    routes.forEach((n,i,arr) => (require(n)))
    // console.log(routes);
    // console.log(routes.forEach(require))

    
    for(let [conf, controller] of routerMap){
      //中间件数组 这里的controller指的就是 
      const controllers = isArray(controller)
      //路由前缀
      const prefixPath = conf.target[prefixSymbol]
      if(prefixPath) prefixPath = normalizaPath(prefixPath)
      //完整路径 = 前缀 + 后缀
      const routerPath = prefixPath + conf.path
      //router.get('/movie',...[中间件数组])
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
            .use(this.router.allowedMethods())
  }
}



const normalizaPath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
  conf.path = normalizaPath(conf.path)
  routerMap.set({
    target: target,
    ...conf
  }, target[key])
  // target: 类.prototype   target[key] 类里面的某一个方法
}


export const controller = path => target => (
  target.prototype[prefixSymbol] = path
)

//获取一条记录
export const get = path => router({
  method: 'get',
  path
})
//提交一条记录
export const post = path => router({
  method: 'post',
  path
})
//修改一条记录
export const put = path => router({
  method: 'put',
  path
})
//删除一条记录
export const del = path => router({
  method: 'del',
  path
})
//处理所有请求
export const all = path => router({
  method: 'all',
  path
})
//koa2使用中间件
export const use = path => router({
  method: 'use',
  path
})
