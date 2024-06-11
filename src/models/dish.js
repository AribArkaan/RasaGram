const connectDB = require('../db');

exports.createDish = async (dishData) => {
    try {
        const connection = await connectDB();
        const [result] = await connection.execute(
            'INSERT INTO dishes (name, description, cooking_time) VALUES (?, ?, ?)', 
            [dishData.name, dishData.description, dishData.cooking_time]
        );
        return { id: result.insertId, ...dishData };
    } catch (err) {
        throw new Error('Failed to create dish: ' + err.message);
    }
};

exports.getDishById = async (dishId) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute(
            'SELECT * FROM dishes WHERE id = ?', 
            [dishId]
        );
        return rows[0];
    } catch (err) {
        throw new Error('Failed to get dish by ID: ' + err.message);
    }
};
