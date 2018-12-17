const Koa = require('koa')
const { resolve } = require('path')
const R = require('ramda')
const config = require('./config')
const MIDDLEWARES = ['router']


const useMiddleWares = (app) => {
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
