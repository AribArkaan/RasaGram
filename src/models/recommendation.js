const connectDB = require('../db');

exports.createRecommendation = async (recommendationData) => {
    const connection = await connectDB();
    const [result] = await connection.execute(
        'INSERT INTO recommendations (photo_id, dish_id) VALUES (?, ?)', 
        [recommendationData.photo_id, recommendationData.dish_id]
    );
    return { id: result.insertId, ...recommendationData };
};

exports.getRecommendationsByPhotoId = async (photoId) => {
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'SELECT * FROM recommendations WHERE photo_id = ?', 
        [photoId]
    );
    return rows;
};
