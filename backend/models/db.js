// This file manages PostgreSQL connections for the Library Management System.

DB_HOST="localhost"
DB_USER="admin"
DB_PASS="123"
    DB_NAME="admin"
DB_PORT="5777"
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
});

console.log('PostgreSQL pool has been created and is ready to use.');

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully at:', res.rows[0].now);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

module.exports = pool;
