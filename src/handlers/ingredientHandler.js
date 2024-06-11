const Ingredient = require('../models/ingredient');

exports.createIngredient = async (req, res) => {
    const ingredientData = {
        name: req.body.name,
        quantity: req.body.quantity,
        unit: req.body.unit,
    };

    try {
        const ingredient = await Ingredient.createIngredient(ingredientData);
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create ingredient' });
    }
};

exports.getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.getIngredientById(req.params.ingredientId);
        res.status(200).json(ingredient);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ingredient' });
    }
};
