/**
 * 开发环境下 
 *    1 提供了动态编译的能力 
 *    2 提供访问静态文件的能力
 */

const Bundler = require('parcel-bundler')
const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

// 返回 入口文件(index.html) 的路径
const r = path => resolve(__dirname, path)

//使用 API 替代 CLI 来初始化 bundler 对象，以获取更高级的使用方式(例如：在每次构建时进行自定义操作)

// 使用提供的 1入口文件路径 和 2选项 来初始化 => bundler
const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/', // 静态资源的 url ，默认为 dist
  watch: true // 是否需要监听文件并在发生改变时重新编译它们，
              //默认为 process.env.NODE_ENV !== 'production'
})



export const dev = async app => {
  //如果你正在使用监听模式，请使用下面这些事件，
  //这是因为该 promise 只会触发一次，而不是每次重新构建时都触发
  console.log('Parcel打包中间件，dev开始打包，入口文件为：', r('../../../src/index.html'))
  await bundler.bundle()


  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')),{
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}