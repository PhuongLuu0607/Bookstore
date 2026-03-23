const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "thuy_duong27",
    database: "book1"
});

module.exports = db;

