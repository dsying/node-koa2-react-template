const query = require('../database/db')


export const getAllSoftwareType = async (page=1, pageSize=10) => {
   
   const offset = (page - 1) * pageSize
   const sql = `select * from sdp_software_classification limit ${offset}, ${pageSize}`
   const rows = await query(sql)
   const count = await query('select count(1) as total from sdp_software_classification')
   return {
    success: true,
    data: { count: count[0].total, rows }
 }
} 


export const updateSoftwareType = async (id, name, path) => {
   console.log(id,name,path);
   const sql = `update sdp_software_classification set name = ${name}, path = ${path} where id = ${id}`
   const rows = await query(sql)
   return {
    success: true,
    data: rows
 }
} 