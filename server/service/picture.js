const query = require('../database/db')


export const getPictures = async () => {
  let sql = `select * from mmall_order`
  let result = await query(sql)
  console.log(result)
  return result
}