const Dish = require('../models/dish');

const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.getDishes();
        res.status(200).json(dishes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dishes' });
    }
};

const createDish = async (req, res) => {
    try {
        const dish = await Dish.createDish(req.body);
        res.status(201).json(dish);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create dish' });
    }
};

module.exports = {
    getDishes,
    createDish,
};
