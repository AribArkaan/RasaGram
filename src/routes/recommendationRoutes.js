const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { processImage, getDishDetails } = require('../services/inferenceService');

// Post route for image upload and processing
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const labelId = await processImage(filePath);
        const details = getDishDetails(labelId);

        // Save photo info to the database
        const photoData = {
            user_id: req.body.user_id,
            filename: req.file.filename,
            path: filePath,
            created_at: new Date(),
            url: `/uploads/${req.file.filename}`,
            description: req.body.description
        };

        const [result] = await req.db.query('INSERT INTO photo SET ?', photoData);

        res.status(200).json({
            photoId: result.insertId,
            details
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
