# Install

```s
yarn install
npm install
```
# Start

```s
npm start
```

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