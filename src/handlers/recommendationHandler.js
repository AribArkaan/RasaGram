// src/handlers/recommendationHandler.js

const { processImage, getDishDetails } = require('../services/inferenceService');

exports.uploadImage = async (req, res) => {
    try {
        const { user_id, description } = req.body; // assuming user_id and description are passed in the request body
        const filePath = req.file.path;
        const fileName = req.file.filename;

        const labelId = await processImage(filePath);
        const dishDetails = getDishDetails(labelId);

        const query = 'INSERT INTO photo (user_id, filename, path, url, description) VALUES (?, ?, ?, ?, ?)';
        const values = [
            user_id,
            fileName,
            filePath,
            `http://localhost:3001/uploads/${fileName}`, // Assuming this is how URL is constructed
            description
        ];

        await req.db.query(query, values);

        res.status(200).json({ ...dishDetails, filePath, fileName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload and process image' });
    }
};
