const connectDB = require('../db');

exports.createPhoto = async (photoData) => {
    try {
        const connection = await connectDB();
        const [result] = await connection.execute(
            'INSERT INTO photo (user_id, filename, path, description, url) VALUES (?, ?, ?, ?, ?)', 
            [photoData.user_id, photoData.filename, photoData.path, photoData.description, photoData.url]
        );
        return { id: result.insertId, ...photoData };
    } catch (err) {
        throw new Error('Failed to create photo: ' + err.message);
    }
};

exports.getPhotos = async () => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM photos');
        return rows;
    } catch (err) {
        throw new Error('Failed to get photos: ' + err.message);
    }
};
