const query = require('../database/db')


export const checkUser = async (userName, password) => {
   const sql = `select * from mmall_user where username = ?`
   const user = await query(sql, userName)
   console.log(user);
   if(user && user.length > 0){
      if(password === user[0].password){
         return {
            success: true,
            data: user
         }
      }else{
         return {
            success: false,
            err: '密码错误'
         }
      }
   }else{
      return {
         success: false,
         err: '用户名不存在'
      }
   }
}