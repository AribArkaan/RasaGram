const connectDB = require('../db');

exports.createRecommendation = async (recommendationData) => {
    try {
        const connection = await connectDB();
        const [result] = await connection.execute(
            'INSERT INTO recommendations (photo_id, dish_id) VALUES (?, ?)', 
            [recommendationData.photo_id, recommendationData.dish_id]
        );
        return { id: result.insertId, ...recommendationData };
    } catch (err) {
        throw new Error('Failed to create recommendation');
    }
};

exports.getRecommendationsByPhotoId = async (photoId) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute(
            'SELECT * FROM recommendations WHERE photo_id = ?', 
            [photoId]
        );
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch recommendations');
    }
};

// Add this function
exports.getAllRecommendations = async () => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM recommendations');
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch recommendations');
    }
};
