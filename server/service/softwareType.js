const query = require('../database/db')


export const getAllSoftwareType = async (page=1, pageSize=10) => {
   
   const offset = (page - 1) * pageSize
   const sql = `SELECT * FROM sdp_software_classification ORDER BY update_time DESC,create_time DESC LIMIT ${offset}, ${pageSize}`
   const rows = await query(sql, [offset, pageSize])
   const count = await query('SELECT COUNT(1) AS total FROM sdp_software_classification')
   return {
    success: true,
    data: { count: count[0].total, rows }
 }
} 


export const updateSoftwareType = async (id, name, path) => {
   const sql = `UPDATE sdp_software_classification SET name = ?, path = ?, update_time = NOW() WHERE id = ?`
   const rows = await query(sql, [ name, path, id ])
   return {
    success: true,
    data: rows
 }
} 

export const deleteSoftwareType = async (id) => {
   const sql = `DELETE FROM sdp_software_classification WHERE id = ?`
   const rows = await query(sql, [ id ])
   return {
    success: true,
    data: rows
 }
} 

export const addSoftwareType = async (name, path) => {
   const sql = `INSERT INTO sdp_software_classification (name, path, create_time, update_time) values (?, ?, NOW(), NOW())`
   const rows = await query(sql, [ name, path ])
   return {
    success: true,
    data: rows
 }
} 