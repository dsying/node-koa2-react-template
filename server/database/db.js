const mysql = require('mysql')
const config = require('../config')

const {database} = config
const pool = mysql.createPool({
  host: database.HOST,
  user: database.USERNAME,
  password: database.PASSWORD,
  database: database.DATABASE
})

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err)
      connection.query(sql, values, (err, rows) => {
        if(err) reject(err)
        resolve(rows)
      })
      connection.release()
    })
  })
}

module.exports = query
