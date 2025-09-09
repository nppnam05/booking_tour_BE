require('dotenv').config();
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise(); // Sử dụng promise để hỗ trợ async/await

module.exports = connection;