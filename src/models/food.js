const connectDB = require('../db');

exports.createFood = async (foodData) => {
    const connection = await connectDB();
    const [result] = await connection.execute(
        'INSERT INTO foods (name, type) VALUES (?, ?)', 
        [foodData.name, foodData.type]
    );
    return { id: result.insertId, ...foodData };
};

exports.getFoodById = async (foodId) => {
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'SELECT * FROM foods WHERE id = ?', 
        [foodId]
    );
    return rows[0];
};
