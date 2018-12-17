const { controller, get, post, put, del } = require('../lib/decorator')
const { getMovieById } = require('../service/movie')


@controller('/movie')
export class movieController{
  @get('/:id')
  async getMovies(ctx, next){
    console.log('111');
     let result = await getMovieById(ctx.params.id)
     ctx.type = 'application/json'
     ctx.body = result
  }
}
// router.get('/movies/:id', async (ctx, next) => {
//   let id = ctx.params.id
//   let sql = `select * from map_bonus_dict where id = ?`

//   let result = await query(sql, id)

//   ctx.type = 'application/json'
//   ctx.body = result
// })

// module.exports = router