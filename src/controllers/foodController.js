const getFoods = (req, res) => {
    // Logic to get foods from database
    res.json({ message: "Get all foods" });
};

const createFood = (req, res) => {
    // Logic to create a new food
    res.json({ message: "Food created" });
};

module.exports = {
    getFoods,
    createFood,
};
