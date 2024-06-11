const connectDB = require('../db');

exports.createDish = async (dishData) => {
    const connection = await connectDB();
    const [result] = await connection.execute(
        'INSERT INTO dishes (name, description) VALUES (?, ?)', 
        [dishData.name, dishData.description]
    );
    return { id: result.insertId, ...dishData };
};

exports.getDishById = async (dishId) => {
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'SELECT * FROM dishes WHERE id = ?', 
        [dishId]
    );
    return rows[0];
};
