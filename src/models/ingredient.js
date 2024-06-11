const connectDB = require('../db');

exports.createIngredient = async (ingredientData) => {
    const connection = await connectDB();
    const [result] = await connection.execute(
        'INSERT INTO ingredients (name, quantity, unit) VALUES (?, ?, ?)', 
        [ingredientData.name, ingredientData.quantity, ingredientData.unit]
    );
    return { id: result.insertId, ...ingredientData };
};

exports.getIngredientById = async (ingredientId) => {
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'SELECT * FROM ingredients WHERE id = ?', 
        [ingredientId]
    );
    return rows[0];
};
