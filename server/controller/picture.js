const Router = require('koa-router')
const router = new Router()

const { controller, get, post, put, del } = require('../lib/decorator')
const { getPictures } = require('../service/picture')


@controller('/picture')
export class pictureController {
  @get('/')
  async getPictures(ctx, next) {
    let result = await getPictures()
    ctx.type = 'application/json'
    ctx.body = result
  }
}
// router.get('/movies/all', async (ctx, next) => {
//   let sql = 'select * from map_bonus_dict'
//   let result = await query(sql)
//   ctx.type = 'application/json'
//   ctx.body = result
// })

// module.exports = router