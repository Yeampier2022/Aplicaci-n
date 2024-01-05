const mysql = require('mysql')
const { promisify } = require('util')

const { database } = require('./key')

const pool = mysql.createPool(database);

pool.getConnection((err, conecction) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if (err.code === 'ER_ACCOUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTION')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REUSED')
        }
    }
    if (conecction) {
        conecction.release()
        console.log("bb is connected")
        return
    }
})
// promises pool query
pool.query = promisify(pool.query)

module.exports = pool