const getDishes = (req, res) => {
    // Logic to get dishes from database
    res.json({ message: "Get all dishes" });
};

const createDish = (req, res) => {
    // Logic to create a new dish
    res.json({ message: "Dish created" });
};

module.exports = {
    getDishes,
    createDish,
};
