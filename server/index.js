const Koa = require('koa')
const { resolve } = require('path')
const R = require('ramda')
const config = require('./config')
const MIDDLEWARES = ['common','router','parcel']


const useMiddleWares = (app) => {
  console.log('待加载的中间件',MIDDLEWARES);
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}


async function start(){
  const app = new Koa()
  await useMiddleWares(app)
  app.listen(config.port)
  console.log(`server starting on port ${config.port}`);
}

start()
