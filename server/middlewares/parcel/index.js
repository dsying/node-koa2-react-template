/**
 * 该js文件 将parcel文件夹 暴露出去
 *    如果你前后端没有做分离，想要在一个项目里 既提供API接口服务 又提供 静态html,css,js,img 
 *    就可以在koa中创建一个中间件，去加载Parcel的bunlder,根据运行时的环境是生产还是开发，来
 *    动态加载两份不同的配置文件
 *            一份： 在开发中 不断地动态编译，处理静态资源
 *         另外一份： 只是简单的提供 html/js 的访问能力
 */

// 判断当前环境 是否是  开发环境
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

// 根据当前所处环境(开发/生产) 暴露不同的 配置文件(dev.js/prod.js)
module.exports = require(`./${env}.js`)