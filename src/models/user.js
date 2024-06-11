const connectDB = require('../db');

exports.createUser = async (userData) => {
    const connection = await connectDB();
    const [result] = await connection.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [userData.username, userData.email, userData.password]
    );
    return { id: result.insertId, ...userData };
};

exports.getUserById = async (userId) => {
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?', 
        [userId]
    );
    return rows[0];
};
