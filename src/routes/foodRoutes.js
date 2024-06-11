const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM foods');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, type, calories } = req.body;
    if (!name || !type) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result] = await req.db.query('INSERT INTO foods (name, type) VALUES (?, ?)', [name, type]);
        res.status(201).json({ id: result.insertId, name, type});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
