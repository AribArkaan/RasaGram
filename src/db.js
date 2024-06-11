// src/db.js
const mysql = require('mysql2/promise');

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'RasaGram'
        });
        console.log('MySQL connected...');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

module.exports = connectDB;
