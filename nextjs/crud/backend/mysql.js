require('dotenv/config')

const mysql = require('mysql')


const pool = mysql.createPool({
    'user': process.env.USER_,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE
})

exports.pool = pool