const Dish = require('../models/dish');

exports.createDish = async (req, res) => {
    const dishData = {
        name: req.body.name,
        description: req.body.description,
        cooking_time: req.body.cooking_time // Menyesuaikan dengan atribut tabel dishes
    };

    try {
        const dish = await Dish.createDish(dishData);
        res.status(201).json(dish);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create dish' });
    }
};

exports.getDishById = async (req, res) => {
    try {
        const dish = await Dish.getDishById(req.params.dishId);
        res.status(200).json(dish);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dish' });
    }
};
