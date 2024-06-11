const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM ingredients');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, quantity, unit } = req.body;
    if (!name || !quantity || !unit) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result] = await req.db.query('INSERT INTO ingredients (name, quantity, unit) VALUES (?, ?, ?)', [name, quantity, unit]);
        res.status(201).json({ id: result.insertId, name, quantity, unit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
