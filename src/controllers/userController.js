// src/controllers/userController.js

const connectDB = require('../db');

const getUsers = async (req, res) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const connection = await connectDB();
        const [result] = await connection.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.status(201).json({ id: result.insertId, username, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUsers,
    createUser,
};
