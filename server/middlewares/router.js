const { Route } = require('../lib/decorator')
const { resolve } = require('path')

export const router = app => {
  const apiPath = resolve(__dirname, '../controller')
  const router = new Route(app, apiPath)

  router.init()
}

//只要这个中间件被 koa引用了 ，就等于 初始化了 整个路由 中间层
