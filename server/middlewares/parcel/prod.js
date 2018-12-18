/**
 * 生产环境下 
 *     1 只提供访问静态文件的能力
 * 
 * 生产环境下 已经 通过package.json 的 script脚本 构建好了 
 * 就不需要 parcel bundle 动态编译了
 */

const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

//处理 路径
const r = path => resolve(__dirname, path)

export const dev = async app => {
  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}