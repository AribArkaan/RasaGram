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
    const { name, description, price, foods_id, cooking_time } = req.body;
    if (!name || !description || !price || !foods_id || !cooking_time) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result] = await req.db.query('INSERT INTO dishes (name, description, price, foods_id, cooking_time) VALUES (?, ?, ?, ?, ?)', [name, description, price, foods_id, cooking_time]);
        res.status(201).json({ id: result.insertId, name, description, price, foods_id, cooking_time });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
