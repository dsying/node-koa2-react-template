const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

// 公共 中间件

const addBodyParser = (app) => {
    app.use(bodyParser())
}

const addLogger = app => {
    app.use(logger())
}

export { addBodyParser, addLogger }