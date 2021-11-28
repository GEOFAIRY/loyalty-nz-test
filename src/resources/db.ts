require("dotenv").config();

var mysql = require("promise-mysql");

let pool:any = null;

exports.createPool = async function () {
    pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        port: 3306,
        queueLimit: 30,
        acquireTimeout: 1000000
    });
};

exports.getPool = async function () {
    return pool;
};
