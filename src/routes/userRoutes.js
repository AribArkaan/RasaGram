const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result] = await req.db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.status(201).json({ id: result.insertId, username, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
