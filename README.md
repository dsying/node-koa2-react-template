# Install

```s
yarn install
npm install
```
# Start

```s
$ npm start
```
start.js
```js
require('babel-core/register')()
require('babel-polyfill')
require('./server/index.js')
```
babel-register	改写 require 命令，为其加载的文件进行转码，不对当前文件转码	只适用于开发环境

babel-polyfill	为所有 API 增加兼容方法	需要在所有代码之前 require，且体积比较大

babel-plugin-transform-runtime & babel-runtime	把帮助类方法从每次使用前定义改为统一 require，精简代码	babel-runtime 需要安装为依赖，而不是开发依赖



# 配置
## parcel 构建
项目整理依赖 Parcel 打包构建

```json
"build": "rm -rf dist && parcel build src/index.html --no-cache -d dist --public-url /"
```
*npm run build*

## .babelrc
通过配置 *.babelrc* , 来支持 es6/es7 语法
Parcel打包时会自动寻找 .babelrc 配置文件
```s
{
  "presets": [
    "env",
    "stage-0",
    "react"
  ],
  "plugins": [
    "transform-runtime",
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```
env 的核心目的是通过配置得知目标环境的特点，然后只做**必要的转换**。例如目标浏览器支持 es2015，那么 es2015 这个 preset 其实是不需要的，于是代码就可以小一点(一般转化后的代码总是更长)，构建时间也可以缩短一些

## Scss

```s
yarn add postcss-preset-env node-sass autoprefixer
```
配置postcss.config.js
```js
module.exports = {
  plugins: [
    require('autoprefixer'), //自动加前缀
    require('cssnext')
  ]
}
```

## nodemon 监听文件改动 并自动重启服务
安装nodemon模块
```s
yarn add --dev nodemon
```
package.json 新增scripts
```s
windows
"start": "rm -rf dist && rm -rf .cache && set NODE_ENV=development nodemon ./start.js",
mac
"start": "rm -rf dist && rm -rf .cache &&  NODE_ENV=development nodemon ./start.js",
```
新增配置文件nodemon.js
```js
{
  "restartable": "rs",//重启的命令,默认是 rs 当用 nodemon 启动应用时可以直接键入 rs 直接重启服务。
  "ignore": [ //忽略的文件后缀名或者文件夹,不在监听范围内
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true, //true 表示输出详细启动与重启信息
  "execMap": {
    "js": "node --harmony"
  },
  "watch": [ //监控的文件夹路径或者文件路径
    "server/",
    "src/views/",
    "views"
  ],
  "ext": "js json" //监控指定后缀名的文件，用空格间隔
}
```

## 实现 开发环境 动态 打包构建
```js
const Bundler = require('parcel-bundler')
// 返回 入口文件(index.html) 的路径
const r = path => resolve(__dirname, path)
const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/', // 静态资源的 url ，默认为 dist
  watch: true // 是否需要监听文件并在发生改变时重新编译它们，
              //默认为 process.env.NODE_ENV !== 'production'
})
export const dev = async app => {
  //如果你正在使用监听模式，请使用下面这些事件，
  //这是因为该 promise 只会触发一次，而不是每次重新构建时都触发
  console.log('dev开始打包，入口文件为：', r('../../../src/index.html'))
  await bundler.bundle()

  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')),{
    extension: 'html'
  })
  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}
```






# 中间件

## koa-static 静态文件

像一些静态文件的处理，Koa 也要现成的模块，省去我们自己需要从本地目录读取文件的很多步骤。
npm i koa-static 安装静态文件模块
```s
const static_ = require('koa-static')

app.use(static_(
    path.join(__dirname, './static')
))
```
这样的一两句代码，就完成了一个静态服务器的搭建，static 目录下的文件，就能支持通过路径访问。

## koa-views 模板引擎
koa-views 是一个视图管理模块，它的灵活度很高，支持很多的模版引擎

dev.js
  //静态文件目录 支持通过路径访问静态文件
  app.use(serve(r('../../../dist')))

  // 配置模板文件目录和后缀名
  app.use(views(r('../../../dist')),{
    extension: 'html'
  })