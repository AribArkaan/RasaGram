const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM photos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { filename, path, description, url } = req.body;
    if (!filename || !path || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let query = 'INSERT INTO photos (filename, path, description';
        let params = [filename, path, description];

        // Memeriksa apakah URL diberikan, jika ya, tambahkan ke kueri dan parameter
        if (url) {
            query += ', url';
            params.push(url);
        }

        query += ') VALUES (?, ?, ?';
        if (url) {
            query += ', ?';
        }
        query += ')';

        const [result] = await req.db.query(query, params);
        res.status(201).json({ id: result.insertId, filename, path, description, url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
