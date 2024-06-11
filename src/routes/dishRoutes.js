const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM dishes');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result] = await req.db.query('INSERT INTO dishes (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
        res.status(201).json({ id: result.insertId, name, description, price });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
