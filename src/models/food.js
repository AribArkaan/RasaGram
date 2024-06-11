const connectDB = require('../db');

exports.createFood = async (foodData) => {
    try {
        const connection = await connectDB();
        const [result] = await connection.execute(
            'INSERT INTO foods (name, type, calories) VALUES (?, ?, ?)', 
            [foodData.name, foodData.type, foodData.calories]
        );
        return { id: result.insertId, ...foodData };
    } catch (err) {
        throw new Error('Failed to create food: ' + err.message);
    }
};

exports.getFoodById = async (foodId) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute(
            'SELECT * FROM foods WHERE id = ?', 
            [foodId]
        );
        return rows[0];
    } catch (err) {
        throw new Error('Failed to get food by ID: ' + err.message);
    }
};

exports.getFoods = async () => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM foods');
        return rows;
    } catch (err) {
        throw new Error('Failed to get foods: ' + err.message);
    }
};
