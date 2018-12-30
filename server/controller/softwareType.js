const Router = require('koa-router')
const router = new Router()

const { controller, get, post, put, del } = require('../middlewares/router/decorator')
const { 
  getAllSoftwareType,
  updateSoftwareType
 } = require('../service/softwareType')


@controller('/softwareType')
export class softwareTypeController {
  @get('/all')
  async getAllSoftwareType(ctx, next) {
    console.log(ctx.query);
    const { page, pageSize } = ctx.query
    const result = await getAllSoftwareType(page, pageSize)
    ctx.type = 'application/json'
    ctx.body = result
  }

  @put('/:id')
  async updateSoftwareType(ctx, next) {
    const {id} = ctx.params
    const { name, path } = ctx.request.body
    const result = await updateSoftwareType(id, name, path)
    ctx.type = 'application/json'
    ctx.body = result
  }
}
