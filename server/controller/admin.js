const Router = require('koa-router')
const router = new Router()

const { controller, get, post, put, del } = require('../middlewares/router/decorator')
const { checkUser } = require('../service/admin')


@controller('/admin')
export class pictureController {
  @post('/login')
  async checkUser(ctx, next) {
    const { userName, password } = ctx.request.body
    const result = await checkUser(userName, password)
    console.log(result);
    ctx.type = 'application/json'
    ctx.body = result
  }
}
