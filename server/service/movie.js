const query = require('../database/db')


export const getMovieById = async (id) => {
   let sql = `select * from mmall_order where id = ?`
   let result = await query(sql, id)
   console.log(result);
   return result
}