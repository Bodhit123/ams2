const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" });

let poolConfig;

if (process.env.NODE_ENV === "production") {
  // Configuration for production environment
  poolConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
} else {
  // Configuration for development environment
  poolConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
  };
}

const pool = mysql.createPool(poolConfig);

const createConnection = (callback) => {
 return pool.getConnection(callback);
};

// Function to release a connection back to the pool
const releaseConnection = (connection) => {
 return connection.release();
};



module.exports = { createConnection, releaseConnection,db:pool };
