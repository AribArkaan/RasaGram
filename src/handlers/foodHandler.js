const Food = require('../models/food');

exports.createFood = async (req, res) => {
    const foodData = {
        name: req.body.name,
        type: req.body.type,
    };

    try {
        const food = await Food.createFood(foodData);
        res.status(201).json(food);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create food' });
    }
};

exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.getFoodById(req.params.foodId);
        res.status(200).json(food);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch food' });
    }
};

exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.getFoods();
        res.status(200).json(foods);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
};
